interface FeatureProps {
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

function FeatureCard({ badge, title, description, image, alt }: FeatureProps) {
  return (
    <div className="flex flex-col py-8">
      {/* Image Container */}
      <div className="mb-8 rounded-xl bg-white/25 p-2 shadow-md">
        <div className="rounded-lg border border-[#dcd8cc] overflow-hidden bg-gradient-to-b from-[#ece9e2] to-[#e8e6dd]">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Badge */}
      <div className="inline-block mb-4">
        <span className="inline-block px-4 py-0.5 rounded-full bg-gradient-to-r from-[#6d6d6d] to-[#4d4d4d] text-white text-sm font-medium shadow-md">
          {badge}
        </span>
      </div>

      {/* Title and Description */}
      <h2 className="text-3xl font-bold text-[#6d6d6d] mb-4">{title}</h2>
      <p className="text-xl text-[#6d6d6d]">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const features: FeatureProps[] = [
    {
      badge: "AI cofounder",
      title: "Designed for making products",
      description:
        "Work with your AI through structured phases taking you from idea to product.",
      image: "https://aicofounder.com/assets/objections/ai-cofounder-example.png",
      alt: "AI cofounder",
    },
    {
      badge: "Deep research",
      title: "Do market research in minutes",
      description:
        "Find out what people really want by searching through social media discussions.",
      image: "https://aicofounder.com/assets/objections/deep-research.png",
      alt: "Deep research",
    },
    {
      badge: "Canvas",
      title: "Visual canvas to bring your product to life",
      description:
        "Turn concepts into something real, organize your ideas, add notes, and get a complete overview of your product.",
      image: "https://aicofounder.com/assets/objections/canvas-example.png",
      alt: "Canvas",
    },
    {
      badge: "For everyone",
      title: "For every founder and product",
      description:
        "Build your first app, expand your consulting service, or launch your next clothing brand.",
      image: "https://aicofounder.com/assets/objections/for-everyone.png",
      alt: "For everyone",
    },
    {
      badge: "Critical",
      title: "Intelligent and critical",
      description:
        'Your idea to sell hats for ducks won\'t be an "Amazing idea!"',
      image: "https://aicofounder.com/assets/objections/critical-example.png",
      alt: "Critical",
    },
    {
      badge: "Secure",
      title: "Secure with privacy in mind",
      description:
        "Industry standard data encryption and privacy mode keeps your project secure and private.",
      image: "https://aicofounder.com/assets/objections/privacy-mode.png",
      alt: "Secure",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex gap-10">
          {/* Left Column - Features List */}
          <div className="w-1/2">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Right Column - Sticky Images */}
          <div className="w-1/2 hidden md:flex justify-end">
            <div className="flex justify-end sticky top-1/2 -translate-y-1/2 -mb-16 mt-28">
              <div className="rounded-2xl bg-white/25 p-2 shadow-md">
                <div className="rounded-lg border border-[#dcd8cc] overflow-hidden bg-gradient-to-b from-[#ece9e2] to-[#e8e6dd] relative w-96 h-96">
                  {features.map((feature, index) => (
                    <img
                      key={index}
                      src={feature.image}
                      alt={feature.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                      style={{
                        opacity: index === 3 ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
