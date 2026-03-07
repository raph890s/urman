import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Auth pages: redirect logged-in users away
  if (pathname.startsWith('/auth/') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protected routes: require session
  const isProtected =
    pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding');

  if (isProtected && !user) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Dashboard: require onboarding complete
  if (user && pathname.startsWith('/dashboard')) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('onboarding_complete')
      .eq('user_id', user.id)
      .single();

    if (!profile?.onboarding_complete) {
      return NextResponse.redirect(new URL('/onboarding/step-1', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
