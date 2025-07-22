import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Share2, RotateCcw, Palette, Type, Image, FileText, Crown, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BrandData } from "../BrandWizard";

interface BrandPreviewProps {
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  onStartOver: () => void;
}

export const BrandPreview = ({ brandData, setBrandData, onStartOver }: BrandPreviewProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'zip') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: `Brand kit exported as ${format.toUpperCase()}!`,
      description: "Your complete brand identity package is ready for download.",
    });
    
    setIsExporting(false);
  };

  const handleUpgrade = () => {
    setShowPricingModal(true);
  };

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <div className="text-center">
      <div 
        className="w-16 h-16 rounded-lg shadow-lg border-2 border-white/20 mb-2"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs font-medium capitalize">{label}</p>
      <p className="text-xs text-muted-foreground font-mono">{color}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Your Complete Brand Identity</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Congratulations! Your AI-generated brand kit is ready. Preview, customize, and export your professional brand identity.
        </p>
      </div>

      {/* Brand Overview Card */}
      <Card className="p-8 bg-gradient-subtle shadow-brand">
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block mb-6">
            <img 
              src={brandData.logoUrl || "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=200&h=200&fit=crop&crop=center"} 
              alt={`${brandData.name} logo`}
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-3" style={{ color: brandData.colors.primary }}>
            {brandData.name}
          </h1>
          <p className="text-xl italic mb-4" style={{ color: brandData.colors.secondary }}>
            "{brandData.tagline}"
          </p>
          
          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="outline">{brandData.tone}</Badge>
            <Badge variant="outline">{brandData.industry}</Badge>
          </div>

          {/* Color Palette Display */}
          <div className="flex justify-center gap-4">
            <ColorSwatch color={brandData.colors.primary} label="Primary" />
            <ColorSwatch color={brandData.colors.secondary} label="Secondary" />
            <ColorSwatch color={brandData.colors.accent} label="Accent" />
            <ColorSwatch color={brandData.colors.neutral} label="Neutral" />
          </div>
        </div>
      </Card>

      {/* Brand Kit Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg transition-all">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center mx-auto mb-4">
              <Image className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Logo Variations</h3>
            <p className="text-sm text-muted-foreground">Primary, secondary, and icon versions</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg transition-all">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-creative flex items-center justify-center mx-auto mb-4">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Color System</h3>
            <p className="text-sm text-muted-foreground">Complete color palette with hex codes</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg transition-all">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4">
              <Type className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Typography</h3>
            <p className="text-sm text-muted-foreground">Primary: {brandData.fonts.primary}<br/>Secondary: {brandData.fonts.secondary}</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft hover:shadow-lg transition-all">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Brand Voice</h3>
            <p className="text-sm text-muted-foreground">Tone guidelines and messaging</p>
          </div>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft">
        <h3 className="text-xl font-semibold mb-6">Brand in Action</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Card Mockup */}
          <div className="text-center">
            <div 
              className="w-full h-32 rounded-lg shadow-lg flex items-center justify-center text-white font-semibold"
              style={{ 
                background: `linear-gradient(135deg, ${brandData.colors.primary}, ${brandData.colors.secondary})` 
              }}
            >
              <div className="text-center">
                <div className="text-lg">{brandData.name}</div>
                <div className="text-xs opacity-90">{brandData.tagline}</div>
              </div>
            </div>
            <p className="text-sm font-medium mt-2">Business Card</p>
          </div>

          {/* Letterhead Mockup */}
          <div className="text-center">
            <div className="w-full h-32 rounded-lg shadow-lg bg-white border-l-4 flex items-start p-4" 
                 style={{ borderLeftColor: brandData.colors.accent }}>
              <div>
                <div className="text-sm font-bold" style={{ color: brandData.colors.primary }}>
                  {brandData.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Professional letterhead template
                </div>
                <div className="h-2 w-16 rounded mt-2" style={{ backgroundColor: brandData.colors.accent }}></div>
              </div>
            </div>
            <p className="text-sm font-medium mt-2">Letterhead</p>
          </div>

          {/* Social Media Mockup */}
          <div className="text-center">
            <div 
              className="w-full h-32 rounded-lg shadow-lg flex items-center justify-center text-white"
              style={{ 
                background: `linear-gradient(45deg, ${brandData.colors.accent}, ${brandData.colors.primary})` 
              }}
            >
              <div className="text-center">
                <div className="text-sm font-bold">{brandData.name}</div>
                <div className="text-xs opacity-90 mt-1">{brandData.tagline}</div>
                <div className="w-8 h-8 rounded-full bg-white/20 mx-auto mt-2"></div>
              </div>
            </div>
            <p className="text-sm font-medium mt-2">Social Media</p>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft">
        <h3 className="text-xl font-semibold mb-6 text-center">Export Your Brand Kit</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Export */}
          <Card className="p-6 border-2 border-border">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Basic Package</h4>
              <p className="text-2xl font-bold text-primary mb-4">Free</p>
              <ul className="text-sm space-y-2 text-left mb-6">
                <li>✓ Logo in PNG format</li>
                <li>✓ Color palette</li>
                <li>✓ Basic brand guidelines</li>
                <li>✗ Vector files</li>
                <li>✗ Multiple logo variations</li>
                <li>✗ Print-ready files</li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Export Basic
              </Button>
            </div>
          </Card>

          {/* Premium Export */}
          <Card className="p-6 border-2 border-primary bg-gradient-subtle">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-primary" />
                <h4 className="text-lg font-semibold">Premium Package</h4>
              </div>
              <p className="text-2xl font-bold text-primary mb-4">$29</p>
              <ul className="text-sm space-y-2 text-left mb-6">
                <li>✓ All logo variations (PNG, SVG, PDF)</li>
                <li>✓ Complete color palette</li>
                <li>✓ Comprehensive brand guidelines</li>
                <li>✓ Typography recommendations</li>
                <li>✓ Business card templates</li>
                <li>✓ Social media kit</li>
                <li>✓ Commercial usage rights</li>
              </ul>
              <Button 
                variant="brand" 
                className="w-full"
                onClick={handleUpgrade}
              >
                <Zap className="h-4 w-4" />
                Upgrade & Export
              </Button>
            </div>
          </Card>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onStartOver}>
          <RotateCcw className="h-4 w-4" />
          Create New Brand
        </Button>
        
        <div className="flex gap-4">
          <Button variant="ghost">
            <Share2 className="h-4 w-4" />
            Share Preview
          </Button>
        </div>
      </div>

      {/* Pricing Modal - Simple overlay for demo */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Upgrade to Premium</h3>
            <p className="text-muted-foreground mb-6">
              Get the complete professional brand kit with all file formats and commercial usage rights.
            </p>
            <div className="space-y-4">
              <Button variant="brand" className="w-full">
                Pay $29 - Get Premium Kit
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowPricingModal(false)}
              >
                Maybe Later
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};