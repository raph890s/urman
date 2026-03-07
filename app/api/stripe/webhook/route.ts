import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';
import { createServiceClient } from '../../../../lib/supabase/server';
import type Stripe from 'stripe';

// Next.js App Router: must read raw body for Stripe signature verification
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (!userId || !session.subscription) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const priceId = subscription.items.data[0]?.price.id;
      const planTier = getPlanTierFromPriceId(priceId);

      await supabase.from('subscriptions').upsert(
        {
          user_id: userId,
          plan_tier: planTier,
          status: subscription.status,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscription.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        },
        { onConflict: 'user_id' },
      );
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id;
      const planTier = getPlanTierFromPriceId(priceId);

      await supabase
        .from('subscriptions')
        .update({
          plan_tier: planTier,
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from('subscriptions')
        .update({ plan_tier: 'free', status: 'canceled', stripe_subscription_id: null })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    default:
      // Ignore other events
      break;
  }

  return NextResponse.json({ received: true });
}

function getPlanTierFromPriceId(priceId: string | undefined): 'free' | 'starter' | 'pro' | 'agency' {
  if (!priceId) return 'free';
  if (priceId === process.env.STRIPE_STARTER_PRICE_ID) return 'starter';
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro';
  if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) return 'agency';
  return 'free';
}
