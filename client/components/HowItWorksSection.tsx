import {
  Users,
  CheckCircle,
  Lightbulb,
  Search,
  FileText,
  Globe,
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureBlock({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#c97a66] to-[#b85c44] flex items-center justify-center shadow-md">
        <div className="text-white text-2xl">{icon}</div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-[#333333]">{title}</h3>
      <p className="text-sm md:text-base text-[#6d6d6d]">{description}</p>
    </div>
  );
}

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  alt: string;
}

function TestimonialBlock({ quote, name, role, image, alt }: TestimonialProps) {
  return (
    <div className="rounded-2xl bg-white/25 p-2 shadow-md">
      <div className="rounded-xl border border-[#dcd8cc] bg-gradient-to-b from-[#ece9e2] to-[#e8e6dd] p-6 md:p-10">
        <div className="text-4xl md:text-5xl text-[#6d6d6d] mb-6 md:mb-8 leading-none">"</div>
        <p className="text-xl md:text-3xl font-medium text-[#6d6d6d] mb-6 md:mb-8">{quote}</p>
        <div className="flex items-center gap-3">
          <img
            alt={alt}
            loading="lazy"
            width="64"
            height="64"
            src={image}
            className="w-16 h-16 rounded-full border border-[#d9d9d9] object-cover flex-shrink-0"
          />
          <div>
            <p className="font-semibold text-sm md:text-base text-[#4d4d4d]">{name}</p>
            <p className="text-xs md:text-sm font-medium text-[#b85c44]">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* First Row - Brainstorm Ideas Section */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Testimonial */}
            <div>
              <TestimonialBlock
                quote="aicofounder helped 'unlock' my stall moment in product ideation and development = so flying through the phases in one go was not only a breeze, but very enjoyable!"
                name="João Doria Neto"
                role="Founder, Squad"
                image="https://aicofounder.com/_next/image?url=%2Fassets%2Fsocial%2Fjoao-doria-neto.webp&w=128&q=75"
                alt="João Doria Neto Testimonial"
              />
            </div>

            {/* Brainstorm Ideas Features */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">
                Brainstorm ideas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureBlock
                  icon={<Users size={24} />}
                  title="Real problems from real people"
                  description="Agents search online communities and surface genuine pain points people actually experience."
                />
                <FeatureBlock
                  icon={<CheckCircle size={24} />}
                  title="Evidence over speculation"
                  description="Every idea is grounded in what real people said they struggle with. Read their words and see the context."
                />
                <FeatureBlock
                  icon={<Lightbulb size={24} />}
                  title="Guided evaluation"
                  description="Your AI cofounder helps you assess which problems are most promising and worth pursuing."
                />
              </div>
            </div>
          </div>

          {/* Second Row - Ultraplan Section */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">
                Ultraplan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureBlock
                  icon={<Lightbulb size={24} />}
                  title="Find your biggest blocker"
                  description="A dedicated planning agent assesses your entire project and identifies the single constraint limiting progress."
                />
                <FeatureBlock
                  icon={<CheckCircle size={24} />}
                  title="Actionable tasks"
                  description="Your AI cofounder creates a plan and works through each task with you, step by step."
                />
                <FeatureBlock
                  icon={<Globe size={24} />}
                  title="Adapts as you grow"
                  description="Replans from scratch at each inflection point so your plan always reflects reality."
                />
              </div>
            </div>

            {/* Second Testimonial */}
            <div>
              <TestimonialBlock
                quote="I used to use ChatGPT to build, research and inspire... But this is next level; answers are much better, connected to Reddit, it is really well organized and structured, it is guided, it leads the conversation, not me."
                name="Pablo Junquera"
                role="Founder, BreadCrumbs"
                image="https://aicofounder.com/_next/image?url=%2Fassets%2Fsocial%2Fx-pablo.webp&w=128&q=75"
                alt="Pablo Junquera Testimonial"
              />
            </div>
          </div>

          {/* Third Row - Deep Research Section */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Third Testimonial */}
            <div>
              <TestimonialBlock
                quote="Honestly, incredible. I've just got my next start up venture idea now and it's been easily validated - all via your platform. That's where I've failed in the past - I build things without validation first."
                name="Vicky Rai"
                role="Founder, Rai Tech Solutions"
                image="https://aicofounder.com/_next/image?url=%2Fassets%2Fsocial%2Fvicky-rai.webp&w=128&q=75"
                alt="Vicky Rai Testimonial"
              />
            </div>

            {/* Deep Research Features */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">
                Deep research
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureBlock
                  icon={<Search size={24} />}
                  title="Parallel AI agents"
                  description="Multiple agents research simultaneously, each going deep on a specific area of your question."
                />
                <FeatureBlock
                  icon={<FileText size={24} />}
                  title="Cited reports"
                  description="Every claim links back to its source so you can verify and trust the findings."
                />
                <FeatureBlock
                  icon={<Globe size={24} />}
                  title="Comprehensive coverage"
                  description="From competitor analysis to regulatory landscapes. Get the thorough research complex questions deserve."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
