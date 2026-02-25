export default function CustomerQuoteSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          {/* Quote */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-8 max-w-2xl mx-auto leading-tight">
            "We followed the steps on aicofounder, and now we have{" "}
            <span className="text-[#b85c44]">paying customers</span> for an app
            we're <span className="text-[#b85c44]">passionate</span> about."
          </h2>

          {/* Author Card */}
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              alt="Ace Apolonio Testimonial"
              loading="lazy"
              width="80"
              height="80"
              src="https://aicofounder.com/_next/image?url=%2Fassets%2Fsocial%2Face-apolonio.webp&w=256&q=75"
              className="w-20 h-20 rounded-full border-2 border-[#d1cec0] object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#333333]">
                Ace Apolonio
              </h3>
              <p className="text-lg text-[#6d6d6d]">Founder, Mindleaf</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
