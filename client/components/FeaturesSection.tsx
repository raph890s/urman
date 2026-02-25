interface FeatureProps {
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

function FeatureCard({ badge, title, description, image, alt, animationIndex }: FeatureProps & { animationIndex: number }) {
  const animationClass = animationIndex % 2 === 0 ? "animate-float-1" : "animate-float-2";
  
  return (
    <div className="flex gap-8 items-start py-8 md:py-10">
      {/* Left Column - Text Content */}
      <div className="flex-1 flex flex-col">
        {/* Badge */}
        <div className="inline-block mb-4 w-fit">
          <span className="inline-block px-4 py-0.5 rounded-full bg-gradient-to-r from-[#6d6d6d] to-[#4d4d4d] text-white text-sm font-medium shadow-md">
            {badge}
          </span>
        </div>

        {/* Title and Description */}
        <h2 className="text-3xl font-bold text-[#6d6d6d] mb-4">{title}</h2>
        <p className="text-xl text-[#6d6d6d]">{description}</p>
      </div>

      {/* Right Column - Image with Animation */}
      <div className={`flex-shrink-0 w-64 h-auto ${animationClass}`}>
        <div className="rounded-xl bg-white/25 p-2 shadow-md">
          <div className="rounded-lg border border-[#dcd8cc] overflow-hidden bg-gradient-to-b from-[#ece9e2] to-[#e8e6dd]">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
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
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} animationIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
