import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCw, ArrowRight, Download, Heart, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BrandData } from "../BrandWizard";

interface LogoGenerationProps {
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  onNext: () => void;
}

interface LogoOption {
  id: string;
  url: string;
  style: string;
  description: string;
  liked: boolean;
}

export const LogoGeneration = ({ brandData, setBrandData, onNext }: LogoGenerationProps) => {
  const [logoOptions, setLogoOptions] = useState<LogoOption[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const { toast } = useToast();

  const generateLogos = async () => {
    setIsGenerating(true);
    
    // Simulate logo generation with AI - In real app, this would call image generation API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock logo options - In production, these would be actual AI-generated images
    const mockLogos: LogoOption[] = [
      {
        id: "logo1",
        url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop&crop=center",
        style: "Modern Minimal",
        description: "Clean geometric design with your brand colors",
        liked: false
      },
      {
        id: "logo2", 
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&crop=center",
        style: "Abstract Symbol",
        description: "Symbolic representation of your brand values",
        liked: false
      },
      {
        id: "logo3",
        url: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop&crop=center", 
        style: "Typographic",
        description: "Text-based logo with custom typography",
        liked: false
      },
      {
        id: "logo4",
        url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop&crop=center",
        style: "Icon + Text",
        description: "Balanced combination of symbol and text",
        liked: false
      }
    ];
    
    setLogoOptions(mockLogos);
    setSelectedLogo(mockLogos[0].id);
    setBrandData({ 
      ...brandData, 
      logoUrl: mockLogos[0].url 
    });
    
    setIsGenerating(false);
    toast({
      title: "Logos generated!",
      description: "AI has created unique logo concepts for your brand.",
    });
  };

  const generateCustomLogo = async () => {
    if (!customPrompt.trim()) {
      toast({
        title: "Custom prompt needed",
        description: "Please describe the type of logo you'd like to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate custom generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const customLogo: LogoOption = {
      id: `custom-${Date.now()}`,
      url: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop&crop=center",
      style: "Custom Design",
      description: customPrompt,
      liked: false
    };
    
    setLogoOptions(prev => [customLogo, ...prev]);
    setSelectedLogo(customLogo.id);
    setBrandData({ 
      ...brandData, 
      logoUrl: customLogo.url 
    });
    setCustomPrompt("");
    setIsGenerating(false);
    
    toast({
      title: "Custom logo created!",
      description: "Your custom logo has been generated based on your specifications.",
    });
  };

  useEffect(() => {
    generateLogos();
  }, []);

  const selectLogo = (logoId: string) => {
    setSelectedLogo(logoId);
    const logo = logoOptions.find(l => l.id === logoId);
    if (logo) {
      setBrandData({ 
        ...brandData, 
        logoUrl: logo.url 
      });
    }
  };

  const toggleLike = (logoId: string) => {
    setLogoOptions(prev => 
      prev.map(logo => 
        logo.id === logoId 
          ? { ...logo, liked: !logo.liked }
          : logo
      )
    );
  };

  if (isGenerating && logoOptions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold mb-4">Creating Your Logos</h2>
        <p className="text-muted-foreground">
          AI is designing unique logos using your brand identity...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">AI-Generated Logo Concepts</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your brand's visual identity starts with a memorable logo. Our AI has created unique concepts based on your brand personality and colors.
        </p>
      </div>

      {/* Custom Logo Generation */}
      <Card className="p-6 bg-gradient-subtle shadow-soft border-2 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          Create Custom Logo
        </h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <Textarea
              placeholder="e.g., 'A minimalist mountain peak logo in green', 'Abstract tree symbol with flowing lines', 'Geometric pattern representing connectivity'..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button 
            variant="brand" 
            onClick={generateCustomLogo}
            disabled={isGenerating}
            className="min-w-32"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate
          </Button>
        </div>
      </Card>

      {/* Logo Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {logoOptions.map((logo) => (
          <Card 
            key={logo.id}
            className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedLogo === logo.id 
                ? 'ring-2 ring-primary bg-gradient-subtle shadow-brand' 
                : 'bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg'
            }`}
            onClick={() => selectLogo(logo.id)}
          >
            <div className="relative mb-4">
              <div 
                className="w-full h-48 rounded-lg shadow-lg bg-white flex items-center justify-center"
                style={{ backgroundColor: brandData.colors.primary + "10" }}
              >
                <img 
                  src={logo.url} 
                  alt={`${brandData.name} logo - ${logo.style}`}
                  className="w-32 h-32 object-contain rounded-lg"
                />
              </div>
              
              {/* Like Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(logo.id);
                }}
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    logo.liked ? 'fill-red-500 text-red-500' : 'text-gray-500'
                  }`} 
                />
              </Button>

              {/* Selected Badge */}
              {selectedLogo === logo.id && (
                <div className="absolute -top-2 -left-2">
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Selected
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{logo.style}</h4>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{logo.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Brand Preview with Logo */}
      {selectedLogo && (
        <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft">
          <h3 className="text-lg font-semibold mb-4">Brand Preview</h3>
          
          <div 
            className="rounded-lg p-8 text-center"
            style={{ 
              background: `linear-gradient(135deg, ${brandData.colors.primary}, ${brandData.colors.secondary})` 
            }}
          >
            <div className="bg-white rounded-lg p-6 inline-block mb-4 shadow-lg">
              <img 
                src={logoOptions.find(l => l.id === selectedLogo)?.url} 
                alt={`${brandData.name} logo`}
                className="w-24 h-24 object-contain"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">{brandData.name}</h2>
            <p className="text-white/90 text-lg italic">"{brandData.tagline}"</p>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={generateLogos} disabled={isGenerating}>
          <RefreshCw className="h-4 w-4" />
          Generate New Options
        </Button>
        
        <Button 
          variant="brand" 
          size="lg" 
          onClick={onNext}
          disabled={!selectedLogo}
        >
          Finalize Brand Kit
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};