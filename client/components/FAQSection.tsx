import { useState } from "react";
import { Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#b3b3b3]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-3 text-left hover:opacity-80 transition-opacity"
      >
        <span className="text-lg font-medium text-[#333333]">{question}</span>
        <div className="flex-shrink-0">
          <Minus
            size={24}
            className="text-[#4d4d4d] transition-transform"
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
            }}
          />
        </div>
      </button>
      {isOpen && (
        <div className="px-3 pb-5 text-[#333333]">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is an AI cofounder?",
      answer:
        "An AI cofounder is an AI that works with you to build a product. It gathers context about your situation, creates a strategic plan, and then helps you execute on it. It does everything from research and ideation to building a website and helping you market. Everything lives on a visual canvas where you can organize documents, notes, and more.",
    },
    {
      question: "How does aicofounder do research?",
      answer:
        "aicofounder uses multiple AI research agents that search the web and social media platforms like Reddit to gather real-world data. They produce detailed reports with citations so you can verify the sources yourself. Use it to validate demand, understand your market, analyze competitors, or research anything relevant to your project.",
    },
    {
      question: "Is aicofounder free to use?",
      answer:
        "Yes, you can use aicofounder for free with 15 credits per month. Upgrade to Pro to get more credits and unlock all features.",
    },
    {
      question: "Can I use aicofounder with my team?",
      answer:
        "Yes, you can share an invite link with your team and collaborate on projects together in real-time.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, you can export documents, notes, research reports, and your content calendar in multiple formats including PDF, DOCX, and Markdown. Websites can be exported as a ZIP with all code included. You can also download your full canvas at once.",
    },
    {
      question: "Does aicofounder work in multiple languages?",
      answer:
        "Yes, the AI will respond to you in whatever language you use.",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-bold text-[#333333] text-center mb-8">
          Frequently asked questions
        </h2>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQAccordion
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
