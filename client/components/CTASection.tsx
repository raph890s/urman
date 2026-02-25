import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-12">
          Make something people actually want
        </h2>

        <a
          href="https://aicofounder.com/signup"
          className="inline-flex items-center justify-center gap-2 bg-[#b85c44] text-white px-6 py-3 rounded-lg font-medium text-lg transition-opacity hover:opacity-90"
        >
          <ArrowRight size={20} />
          Get started today
        </a>
      </div>
    </section>
  );
}
