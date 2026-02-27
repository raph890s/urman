const testimonials = [
  {
    name: "Leo",
    title: "19, Solo SaaS Founder",
    quote: "This replaced my need for a co-founder. I'm building a SaaS alone at 19, and Urman gives me daily direction, priorities, and strategic feedback so I never feel stuck or lost anymore.",
    highlight: "replaced my need for a co-founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  },
  {
    name: "Maya",
    title: "Indie Developer",
    quote: "I finally stopped guessing what to build. As an indie developer, I used to jump between ideas constantly, but Urman helped me validate faster and focus on features that actually matter.",
    highlight: "stopped guessing what to build",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
  },
  {
    name: "Adam",
    title: "First-time Founder",
    quote: "My productivity literally doubled. I went from planning endlessly to shipping weekly because Urman breaks big startup goals into clear, actionable steps.",
    highlight: "productivity literally doubled",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adam",
  },
  {
    name: "Karim",
    title: "Bootstrapped Founder",
    quote: "Decision fatigue disappeared overnight. Running a bootstrapped startup alone was overwhelming, but Urman prioritizes my next moves and helps me think like an experienced founder.",
    highlight: "Decision fatigue disappeared overnight",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
  },
  {
    name: "Lucas",
    title: "21, Student Founder",
    quote: "I shipped more in two weeks than in the previous three months. Urman keeps me accountable and constantly pushes me toward execution instead of overthinking.",
    highlight: "shipped more in two weeks",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
  },
  {
    name: "Sofia",
    title: "AI Tool Creator",
    quote: "This feels unfair to build without. Urman gives me structured strategy, marketing direction, and product clarity that normally takes years of experience to develop.",
    highlight: "unfair to build without",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
  },
  {
    name: "Ethan",
    title: "Solo Developer",
    quote: "My startup finally makes sense. Before Urman, my roadmap was messy and reactive; now my product, growth strategy, and goals are aligned in one system.",
    highlight: "finally makes sense",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    name: "Daniel",
    title: "Micro-SaaS Builder",
    quote: "I stopped overthinking every decision. Urman analyzes my situation and gives clear recommendations, which helped me move faster and gain confidence as a founder.",
    highlight: "stopped overthinking every decision",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
  },
  {
    name: "Youssef",
    title: "Indie Hacker",
    quote: "The clarity is honestly addictive. Every session with Urman leaves me with specific actions to execute, which completely changed how I approach building.",
    highlight: "clarity is honestly addictive",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef",
  },
  {
    name: "Clara",
    title: "Product Builder",
    quote: "Launching stopped feeling overwhelming. Urman turned my vague startup idea into a structured launch plan that I could realistically follow day by day.",
    highlight: "stopped feeling overwhelming",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clara",
  },
  {
    name: "Ryan",
    title: "Solo Founder",
    quote: "I finally understand marketing strategy. Instead of copying trends online, Urman creates personalized growth plans based on my product and audience.",
    highlight: "finally understand marketing strategy",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
  },
  {
    name: "Lina",
    title: "Student Entrepreneur",
    quote: "My chaos turned into a real system. As a student entrepreneur juggling everything alone, Urman organized my ideas, priorities, and execution into one workflow.",
    highlight: "chaos turned into a real system",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lina",
  },
];

const additionalTestimonials = [
  {
    name: "Noah",
    title: "SaaS Creator",
    quote: "It feels like upgrading how I think. Urman doesn't just give answers — it challenges my assumptions and helps me make smarter founder decisions.",
    highlight: "upgrading how I think",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    name: "Alex",
    title: "20, Indie Founder",
    quote: "I stopped consuming startup content and started executing. Urman keeps me focused on measurable progress instead of endless learning and procrastination.",
    highlight: "stopped consuming startup content",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sam",
    title: "Early-stage Founder",
    quote: "This is the closest thing to a real co-founder I've experienced. Urman helped me go from idea stage to early traction by guiding both product decisions and growth strategy.",
    highlight: "closest thing to a real co-founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
  },
];

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  highlight: string;
  image: string;
}

function TestimonialCard({ name, title, quote, image }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-72 bg-gradient-to-b from-card to-muted rounded-lg p-5 shadow-sm border border-border">
      <div className="flex items-center gap-4 mb-2">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full border border-border"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground text-sm">{name}</h3>
          <p className="text-muted-foreground text-xs">{title}</p>
        </div>
      </div>
      <div className="text-accent mb-2 text-lg">★★★★★</div>
      <p className="text-foreground text-sm leading-relaxed line-clamp-5">
        {quote.split(new RegExp(`(${quote.substring(quote.indexOf("You can") || quote.indexOf("saving") || quote.indexOf("Having") || quote.indexOf("it feels") || quote.indexOf("I've just") || quote.indexOf("definitely") || quote.indexOf("aicofounder") || quote.indexOf("Building") || quote.indexOf("It's") || quote.indexOf("5 star") || quote.indexOf("I never") || quote.indexOf("has added"), Math.min(20, quote.length))})`, 'i')).map((part, i) => 
          i % 2 === 1 ? (
            <mark key={i} className="bg-accent/20 rounded px-1">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <style>{`
        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(50%);
          }
        }
        
        .scroll-left {
          animation: scrollLeft 120s linear infinite;
        }
        
        .scroll-right {
          animation: scrollRight 120s linear infinite;
        }
      `}</style>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* First scrolling row (left) */}
        <div className="overflow-hidden mb-5">
          <div className="flex gap-4 scroll-left">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                {...testimonial}
              />
            ))}
          </div>
        </div>

        {/* Second scrolling row (right) */}
        <div className="overflow-hidden">
          <div className="flex gap-4 flex-row-reverse scroll-right">
            {[...additionalTestimonials, ...additionalTestimonials].map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
