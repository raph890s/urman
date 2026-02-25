import { Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-[#d9d9d9] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Logo and Company Info */}
          <div className="col-span-2 md:col-span-1">
            <a href="https://aicofounder.com/" className="inline-block mb-4">
              <img
                alt="aicofounder.com logo"
                loading="lazy"
                src="https://aicofounder.com/assets/aicofounder-logo-black.svg"
                className="h-7 max-w-full"
              />
            </a>
            <div className="flex flex-col gap-1 text-sm text-[#4d4d4d]">
              <div>Made in Europe 🇪🇺</div>
              <div>© 2026 aicofounder.com</div>
              <a
                href="mailto:hi@aicofounder.com"
                className="hover:text-[#333333] transition-colors"
              >
                hi@aicofounder.com
              </a>
              <div className="flex gap-2 mt-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  href="https://linkedin.com/company/aicofoundercom"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  href="https://youtube.com/@aicofoundercom/videos"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  <Youtube size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-[#1f1f1f] mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://aicofounder.com/pricing"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/docs"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/demo"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Demo
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/our-story"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Our story
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/blog"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="font-medium text-[#1f1f1f] mb-3">Compare</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://aicofounder.com/compare/chatgpt"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  vs ChatGPT
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-medium text-[#1f1f1f] mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://aicofounder.com/contributors"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Contributors
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/affiliate"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Affiliate program
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-medium text-[#1f1f1f] mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://aicofounder.com/signin"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/signup"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-[#1f1f1f] mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://aicofounder.com/privacy"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="https://aicofounder.com/terms"
                  className="text-[#4d4d4d] hover:text-[#333333] transition-colors"
                >
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
