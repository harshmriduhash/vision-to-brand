import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, RefreshCw, ArrowRight, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BrandData } from "../BrandWizard";

interface BrandSuggestionsProps {
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  onNext: () => void;
}

interface BrandSuggestion {
  name: string;
  tagline: string;
  tone: string;
  reasoning: string;
}

export const BrandSuggestions = ({ brandData, setBrandData, onNext }: BrandSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<BrandSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const { toast } = useToast();

  // Mock AI generation - in real app, this would call GPT-4o API
  const generateBrandSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock suggestions based on vision keywords
    const vision = brandData.vision.toLowerCase();
    let mockSuggestions: BrandSuggestion[] = [];
    
    if (vision.includes('sustainable') || vision.includes('eco')) {
      mockSuggestions = [
        {
          name: "EcoFlow",
          tagline: "Sustainable choices, seamless future",
          tone: "Professional, environmentally conscious, trustworthy",
          reasoning: "Emphasizes flow and continuity of sustainable practices"
        },
        {
          name: "GreenVault", 
          tagline: "Protecting what matters most",
          tone: "Reliable, protective, forward-thinking",
          reasoning: "Suggests security and preservation of environmental values"
        },
        {
          name: "TerraLink",
          tagline: "Connecting earth to innovation",
          tone: "Modern, connective, nature-inspired",
          reasoning: "Links technology with environmental stewardship"
        }
      ];
    } else if (vision.includes('ai') || vision.includes('tech')) {
      mockSuggestions = [
        {
          name: "MindBridge",
          tagline: "Bridging human potential with AI",
          tone: "Innovative, human-centered, intelligent",
          reasoning: "Connects human needs with artificial intelligence"
        },
        {
          name: "NeuralFlow",
          tagline: "Intelligence that adapts to you",
          tone: "Smart, adaptive, user-focused",
          reasoning: "Suggests fluid, natural AI interaction"
        },
        {
          name: "CogniSphere",
          tagline: "Your world of intelligent solutions",
          tone: "Comprehensive, intelligent, encompassing",
          reasoning: "Implies complete cognitive ecosystem"
        }
      ];
    } else {
      mockSuggestions = [
        {
          name: "VisionCraft",
          tagline: "Crafting tomorrow's solutions today",
          tone: "Creative, forward-thinking, craftsmanship-focused",
          reasoning: "Emphasizes skilled creation of future-oriented solutions"
        },
        {
          name: "PulsePoint",
          tagline: "At the heart of innovation",
          tone: "Dynamic, central, pulse of industry",
          reasoning: "Suggests being at the core of industry movement"
        },
        {
          name: "NexusLab",
          tagline: "Where ideas become reality",
          tone: "Experimental, connecting, reality-making",
          reasoning: "Laboratory for turning concepts into tangible outcomes"
        }
      ];
    }

    setSuggestions(mockSuggestions);
    
    // Set first suggestion as default
    setBrandData({
      ...brandData,
      name: mockSuggestions[0].name,
      tagline: mockSuggestions[0].tagline,
      tone: mockSuggestions[0].tone,
      industry: vision.includes('sustainable') ? 'Sustainability' : 
                vision.includes('ai') ? 'Technology' : 'Innovation'
    });
    
    setIsGenerating(false);
    toast({
      title: "Brand suggestions generated!",
      description: "AI has created personalized brand options based on your vision.",
    });
  };

  useEffect(() => {
    generateBrandSuggestions();
  }, []);

  const selectSuggestion = (index: number) => {
    setSelectedIndex(index);
    const suggestion = suggestions[index];
    setBrandData({
      ...brandData,
      name: suggestion.name,
      tagline: suggestion.tagline,
      tone: suggestion.tone
    });
  };

  const regenerateSuggestions = () => {
    generateBrandSuggestions();
    setSelectedIndex(0);
  };

  if (isGenerating) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold mb-4">Generating Brand Suggestions</h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your vision and crafting unique brand identities...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">AI-Generated Brand Suggestions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your vision, we've created unique brand identities. Choose one to customize, or use as inspiration.
        </p>
      </div>

      {/* Suggestions Grid */}
      <div className="grid gap-6">
        {suggestions.map((suggestion, index) => (
          <Card 
            key={index}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-brand ${
              selectedIndex === index 
                ? 'ring-2 ring-primary bg-gradient-subtle shadow-brand' 
                : 'bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg'
            }`}
            onClick={() => selectSuggestion(index)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-primary">{suggestion.name}</h3>
                <p className="text-lg text-accent font-medium italic">"{suggestion.tagline}"</p>
              </div>
              {selectedIndex === index && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  Selected
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Brand Tone:</Label>
                <p className="text-sm">{suggestion.tone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Why this works:</Label>
                <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Option */}
      <Card className="p-6 bg-white/40 backdrop-blur-sm shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Create Custom Brand Identity</h3>
          <Button 
            variant="outline" 
            onClick={() => setCustomMode(!customMode)}
          >
            <Edit3 className="h-4 w-4" />
            Customize
          </Button>
        </div>

        {customMode && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="custom-name">Brand Name</Label>
                <Textarea
                  id="custom-name"
                  value={brandData.name}
                  onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="custom-tagline">Tagline</Label>
                <Textarea
                  id="custom-tagline"
                  value={brandData.tagline}
                  onChange={(e) => setBrandData({ ...brandData, tagline: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="custom-tone">Brand Tone</Label>
              <Textarea
                id="custom-tone"
                value={brandData.tone}
                onChange={(e) => setBrandData({ ...brandData, tone: e.target.value })}
                placeholder="e.g., Professional, friendly, innovative, trustworthy"
                className="h-12"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={regenerateSuggestions}>
          <RefreshCw className="h-4 w-4" />
          Generate New Options
        </Button>
        
        <Button variant="brand" size="lg" onClick={onNext}>
          Continue with "{brandData.name}"
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};