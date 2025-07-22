import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ArrowRight, Palette, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BrandData } from "../BrandWizard";

interface ColorPaletteProps {
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  onNext: () => void;
}

interface ColorScheme {
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  mood: string;
}

export const ColorPalette = ({ brandData, setBrandData, onNext }: ColorPaletteProps) => {
  const [palettes, setPalettes] = useState<ColorScheme[]>([]);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string>("");
  const { toast } = useToast();

  const generateColorPalettes = () => {
    // Mock color palettes based on brand tone and industry
    const tone = brandData.tone.toLowerCase();
    const industry = brandData.industry.toLowerCase();
    
    let mockPalettes: ColorScheme[] = [];
    
    if (tone.includes('sustainable') || industry.includes('sustainability')) {
      mockPalettes = [
        {
          name: "Forest Harmony",
          description: "Natural greens with earthy accents for environmental trust",
          primary: "#047857",
          secondary: "#059669", 
          accent: "#f59e0b",
          neutral: "#6b7280",
          mood: "Natural, trustworthy, growing"
        },
        {
          name: "Ocean Breeze",
          description: "Cool blues and teals conveying freshness and clarity",
          primary: "#0891b2",
          secondary: "#0d9488",
          accent: "#06b6d4",
          neutral: "#64748b",
          mood: "Fresh, clean, infinite"
        },
        {
          name: "Earth Elements",
          description: "Warm browns and sage greens for organic authenticity",
          primary: "#92400e",
          secondary: "#65a30d",
          accent: "#ca8a04",
          neutral: "#78716c",
          mood: "Organic, authentic, grounded"
        }
      ];
    } else if (tone.includes('tech') || tone.includes('ai') || industry.includes('technology')) {
      mockPalettes = [
        {
          name: "Digital Future",
          description: "Modern purples and blues for tech innovation",
          primary: "#7c3aed",
          secondary: "#3b82f6",
          accent: "#06b6d4",
          neutral: "#64748b",
          mood: "Innovative, digital, forward-thinking"
        },
        {
          name: "Neural Network",
          description: "Deep blues with electric accents for AI sophistication",
          primary: "#1e40af",
          secondary: "#3730a3",
          accent: "#ec4899",
          neutral: "#6b7280",
          mood: "Intelligent, sophisticated, cutting-edge"
        },
        {
          name: "Cyber Glow",
          description: "Neon-inspired palette for modern tech appeal",
          primary: "#8b5cf6",
          secondary: "#06b6d4",
          accent: "#f59e0b",
          neutral: "#64748b",
          mood: "Electric, modern, dynamic"
        }
      ];
    } else {
      mockPalettes = [
        {
          name: "Professional Edge",
          description: "Classic blues with warm accents for business trust",
          primary: "#2563eb",
          secondary: "#1d4ed8",
          accent: "#f59e0b",
          neutral: "#6b7280",
          mood: "Professional, trustworthy, reliable"
        },
        {
          name: "Creative Burst",
          description: "Vibrant palette for creative and energetic brands",
          primary: "#dc2626",
          secondary: "#ea580c",
          accent: "#7c2d12",
          neutral: "#78716c",
          mood: "Energetic, bold, creative"
        },
        {
          name: "Elegant Minimalism",
          description: "Sophisticated grays with purple accent for luxury feel",
          primary: "#374151",
          secondary: "#4b5563",
          accent: "#8b5cf6",
          neutral: "#9ca3af",
          mood: "Elegant, minimalist, sophisticated"
        }
      ];
    }
    
    setPalettes(mockPalettes);
    
    // Set first palette as default
    setBrandData({
      ...brandData,
      colors: {
        primary: mockPalettes[0].primary,
        secondary: mockPalettes[0].secondary,
        accent: mockPalettes[0].accent,
        neutral: mockPalettes[0].neutral
      }
    });
  };

  useEffect(() => {
    generateColorPalettes();
  }, []);

  const selectPalette = (index: number) => {
    setSelectedPalette(index);
    const palette = palettes[index];
    setBrandData({
      ...brandData,
      colors: {
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent,
        neutral: palette.neutral
      }
    });
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(""), 2000);
      toast({
        title: "Color copied!",
        description: `${color} has been copied to your clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy color to clipboard.",
        variant: "destructive"
      });
    }
  };

  const ColorCircle = ({ color, label, size = "large" }: { color: string; label: string; size?: "small" | "large" }) => {
    const sizeClass = size === "large" ? "w-16 h-16" : "w-10 h-10";
    const textSize = size === "large" ? "text-sm" : "text-xs";
    
    return (
      <div className="flex flex-col items-center gap-2">
        <div 
          className={`${sizeClass} rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg ring-2 ring-white/20`}
          style={{ backgroundColor: color }}
          onClick={() => copyColor(color)}
        />
        <div className="text-center">
          <p className={`${textSize} font-medium capitalize`}>{label}</p>
          <p className={`${size === "large" ? "text-xs" : "text-[10px]"} text-muted-foreground font-mono`}>
            {copiedColor === color ? <Check className="h-3 w-3 mx-auto text-success" /> : color}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Perfect Color Palette</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Colors evoke emotions and build brand recognition. Choose a palette that reflects your brand's personality and resonates with your audience.
        </p>
      </div>

      {/* Color Palettes */}
      <div className="grid gap-6">
        {palettes.map((palette, index) => (
          <Card 
            key={index}
            className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedPalette === index 
                ? 'ring-2 ring-primary bg-gradient-subtle shadow-brand' 
                : 'bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg'
            }`}
            onClick={() => selectPalette(index)}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{palette.name}</h3>
                <p className="text-muted-foreground mb-2">{palette.description}</p>
                <Badge variant="outline" className="text-xs">
                  Mood: {palette.mood}
                </Badge>
              </div>
              {selectedPalette === index && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  Selected
                </Badge>
              )}
            </div>

            <div className="flex justify-center gap-8">
              <ColorCircle color={palette.primary} label="Primary" />
              <ColorCircle color={palette.secondary} label="Secondary" />
              <ColorCircle color={palette.accent} label="Accent" />
              <ColorCircle color={palette.neutral} label="Neutral" />
            </div>
          </Card>
        ))}
      </div>

      {/* Brand Preview */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Brand Preview with Selected Colors
        </h3>
        
        <div 
          className="rounded-lg p-8 text-center"
          style={{ 
            background: `linear-gradient(135deg, ${brandData.colors.primary}, ${brandData.colors.secondary})` 
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">{brandData.name}</h2>
          <p className="text-white/90 text-lg italic">"{brandData.tagline}"</p>
          
          <div className="flex justify-center gap-4 mt-6">
            <div 
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: brandData.colors.accent }}
            />
            <div 
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: brandData.colors.neutral }}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-6">
          <ColorCircle color={brandData.colors.primary} label="Primary" size="small" />
          <ColorCircle color={brandData.colors.secondary} label="Secondary" size="small" />
          <ColorCircle color={brandData.colors.accent} label="Accent" size="small" />
          <ColorCircle color={brandData.colors.neutral} label="Neutral" size="small" />
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={generateColorPalettes}>
          <RefreshCw className="h-4 w-4" />
          Generate New Palettes
        </Button>
        
        <Button variant="brand" size="lg" onClick={onNext}>
          Continue with Colors
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};