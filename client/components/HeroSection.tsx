import { ArrowUp, Lightbulb, Zap, ToggleRight } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Card - Market Research (Top Left) */}
        <div className="absolute left-4 md:left-[4%] top-[18%] w-56 animate-float-1 pointer-events-none">
          <div className="bg-card rounded-lg border border-border shadow-sm p-3">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-muted">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z" fill="none" stroke="currentColor" strokeWidth="32" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-medium text-foreground truncate">Market research report</span>
              </div>
              <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5858 5H14V3H21V10H19V6.41421L14.7071 10.7071L13.2929 9.29289L17.5858 5ZM3 14H5V17.5858L9.29289 13.2929L10.7071 14.7071L6.41421 19H10V21H3V14Z" />
              </svg>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-foreground mb-2.5">
                3 underserved neighborhoods for specialty coffee in Austin
              </p>
              <div className="space-y-2 mb-3">
                <div className="h-2 bg-muted rounded-full w-full"></div>
                <div className="h-2 bg-muted rounded-full w-4/5"></div>
                <div className="h-2 bg-muted rounded-full w-full"></div>
              </div>
              <div className="border-t border-muted pt-1.5">
                <span className="text-[10px] text-muted-foreground">236 sources</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Card - Austin Bean Co (Top Right) */}
        <div className="absolute right-4 md:right-[4%] top-[15%] w-56 pointer-events-none">
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-2 py-2 border-b border-muted bg-muted/50">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted-foreground/50 rounded"></div>
                <div className="h-1.5 w-8 bg-muted-foreground/50 rounded-full"></div>
              </div>
              <div className="flex gap-1.5">
                <div className="h-1.5 w-6 bg-muted rounded-full"></div>
                <div className="h-1.5 w-6 bg-muted rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 py-2 border-b border-muted bg-card">
              <div className="flex items-center gap-2 flex-1">
                <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z" />
                </svg>
                <span className="text-xs font-medium text-foreground truncate">Austin Bean Co.</span>
              </div>
              <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5858 5H14V3H21V10H19V6.41421L14.7071 10.7071L13.2929 9.29289L17.5858 5ZM3 14H5V17.5858L9.29289 13.2929L10.7071 14.7071L6.41421 19H10V21H3V14Z" />
              </svg>
            </div>

            <div className="bg-muted/50 px-2 py-2 space-y-1.5">
              <div className="h-2 bg-muted rounded-full w-full"></div>
              <div className="flex gap-1.5">
                <div className="h-1.5 w-6 bg-muted rounded-full"></div>
                <div className="h-1.5 w-6 bg-muted rounded-full"></div>
              </div>
              <div className="flex gap-1.5">
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-muted/70 rounded w-4/5"></div>
                  <div className="h-1.5 bg-muted rounded w-3/5"></div>
                  <div className="h-3 bg-amber-100 rounded w-2/5 mt-1"></div>
                </div>
                <div className="h-12 w-14 bg-amber-50 rounded"></div>
              </div>
            </div>

            <div className="px-2 py-1.5 border-t border-muted flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-[10px] text-foreground">Published</span>
            </div>
          </div>
        </div>

        {/* Floating Badge - Key Insight (Bottom Right) */}
        <div className="absolute right-6 md:right-[6%] bottom-1/4 w-40 pointer-events-none">
          <div className="bg-yellow-100 rounded-lg border border-yellow-200 shadow-sm p-4 text-center">
            <p className="text-xs leading-snug text-slate-800">
              <span className="font-bold">Key insight</span>
              : No direct competitor in the local market
            </p>
          </div>
        </div>

        {/* Floating Badge - You (Bottom Right) */}
        <div className="absolute right-8 md:right-[8%] bottom-[16%] animate-float-2 pointer-events-none">
          <div className="relative">
            <svg
              className="w-6 h-6 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ transform: "scaleX(-1)" }}
            >
              <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" />
            </svg>
            <div className="absolute top-5 left-5 bg-foreground text-background text-xs font-medium rounded px-2 py-1 whitespace-nowrap">
              You
            </div>
          </div>
        </div>

        {/* AI Badge (Left) */}
        <div className="absolute left-12 md:left-[12%] top-[30%] animate-float-1 pointer-events-none">
          <div className="relative">
            <svg
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute top-5 left-5 bg-accent text-accent-foreground text-xs font-medium rounded px-2 py-1 whitespace-nowrap">
              AI
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-foreground to-primary rounded-full px-4 py-2 shadow-sm">
          <h1 className="text-xs font-medium text-background">AI cofounder</h1>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 max-w-2xl leading-tight">
          Make something people{" "}
          <br className="hidden md:block" />
          actually want
        </h2>

        {/* Subheading */}
        <p className="text-base md:text-xl text-muted-foreground mb-12 max-w-2xl">
          Research and build your product with AI
        </p>

        {/* Form */}
        <div className="w-full max-w-2xl mb-6">
          <form className="relative bg-card rounded-3xl border border-border shadow-sm p-3">
            <textarea
              placeholder="I want to develop AI agents for my HVAC business..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm rounded-lg p-3 pr-12 resize-none focus:outline-none min-h-24 max-h-48"
            />
            <button
              type="submit"
              disabled
              className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg bg-accent/50 text-accent-foreground hover:bg-accent transition-colors disabled:opacity-50 cursor-not-allowed"
              aria-label="Send message"
            >
              <ArrowUp size={16} />
            </button>
          </form>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl">
          <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-b from-card to-muted border border-border shadow-xs hover:shadow-sm transition-all">
            <Lightbulb size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Brainstorm ideas</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-help">
              <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 256 256">
                <path d="M244,104H219.21L175.82,44.24a20,20,0,0,0-31.61-.94L131.39,58.16c-.1.11-.2.23-.29.35a4,4,0,0,1-6.2,0c-.09-.12-.19-.24-.29-.35L111.79,43.3a20,20,0,0,0-31.61.94L36.79,104H12a12,12,0,0,0,0,24H244a12,12,0,0,0,0-24ZM96.62,62.45l9.69,11.24a28,28,0,0,0,43.38,0l9.69-11.24L189.55,104H66.45ZM180,140a40.07,40.07,0,0,0-38.16,28H114.16a40,40,0,1,0,0,24h27.68A40,40,0,1,0,180,140ZM76,196a16,16,0,1,1,16-16A16,16,0,0,1,76,196Zm104,0a16,16,0,1,1,16-16A16,16,0,0,1,180,196Z" />
              </svg>
              <span className="text-sm font-medium text-primary">Privacy mode</span>
            </div>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`relative w-11 h-6 rounded-lg transition-colors ${
                privacyMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded bg-card shadow-xs transition-transform ${
                  privacyMode ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 md:mt-20 flex flex-col items-center gap-4 w-full">
          <div className="flex items-center -space-x-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card flex items-center justify-center text-xs font-semibold text-background"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-foreground">Trusted by 30,000+ founders</p>
        </div>
      </div>
    </div>
  );
}
