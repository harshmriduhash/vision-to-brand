import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Palette, Type, Image } from "lucide-react";

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K')]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-16 h-16 rounded-full bg-gradient-brand opacity-20"></div>
      </div>
      <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 rounded-lg bg-gradient-creative opacity-20"></div>
      </div>
      <div className="absolute bottom-32 left-40 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-8 rounded-full bg-gradient-hero opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft border border-white/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Brand Identity Generator</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Transform Your Vision Into a 
            <span className="block">Complete Brand</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            From startup vision to professional brand identity in minutes. AI generates your perfect name, colors, 
            fonts, logo, and brand voice – everything you need to launch with confidence.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40">
              <Type className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Brand Names & Messaging</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40">
              <Palette className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Color Palettes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40">
              <Image className="h-4 w-4 text-creative-purple" />
              <span className="text-sm font-medium">Logo Generation</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onGetStarted}
            className="animate-pulse-glow"
          >
            Create Your Brand Identity
            <ArrowRight className="h-5 w-5" />
          </Button>

          {/* Trust Indicators */}
          <p className="text-sm text-muted-foreground mt-8">
            ✨ No design experience needed • 🚀 Launch-ready in 10 minutes • 💼 Professional results
          </p>
        </div>
      </div>
    </section>
  );
};