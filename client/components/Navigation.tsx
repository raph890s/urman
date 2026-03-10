import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <svg
              className="w-8 h-8"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-bold text-lg" fill="currentColor">
                AI
              </text>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 items-center">
              <a href="/" className="text-sm font-medium hover:text-accent transition-colors">
                Pricing
              </a>
              <a href="/" className="text-sm font-medium hover:text-accent transition-colors">
                Docs
              </a>
              <a href="/" className="text-sm font-medium hover:text-accent transition-colors">
                Our story
              </a>
            </div>

            <div className="flex gap-3 items-center">
              <a
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-muted transition-colors"
              >
                Sign in
              </a>
              <a
                href="/auth/signup"
                className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-3">
            <a href="/" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors">
              Pricing
            </a>
            <a href="/" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors">
              Docs
            </a>
            <a href="/" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors">
              Our story
            </a>
            <div className="flex gap-3 pt-2">
              <a
                href="/auth/login"
                className="flex-1 px-4 py-2 text-sm font-medium text-center rounded-md border border-border hover:bg-muted transition-colors"
              >
                Sign in
              </a>
              <a
                href="/auth/signup"
                className="flex-1 px-4 py-2 text-sm font-medium text-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
