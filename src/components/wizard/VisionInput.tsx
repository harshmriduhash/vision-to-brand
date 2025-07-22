import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, ArrowRight } from "lucide-react";
import type { BrandData } from "../BrandWizard";

interface VisionInputProps {
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  onNext: () => void;
}

export const VisionInput = ({ brandData, setBrandData, onNext }: VisionInputProps) => {
  const [inputMethod, setInputMethod] = useState<'text' | 'upload'>('text');

  const handleVisionChange = (value: string) => {
    setBrandData({ ...brandData, vision: value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd process the file here
      // For now, we'll just set a placeholder
      setBrandData({ 
        ...brandData, 
        vision: `Uploaded: ${file.name}\n\nPlease describe your startup vision manually for this demo.` 
      });
    }
  };

  const exampleVisions = [
    "A sustainable food delivery platform that connects local organic farmers directly with conscious consumers, reducing food miles and supporting community agriculture.",
    "An AI-powered mental wellness app that provides personalized meditation, mood tracking, and connects users with certified therapists for affordable, accessible mental health support.",
    "A blockchain-based platform for musicians that enables direct fan funding, transparent royalty distribution, and decentralized music streaming without traditional record labels."
  ];

  const canProceed = brandData.vision.trim().length > 50;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Share Your Startup Vision</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us about your business idea, mission, and target audience. The more detail you provide, 
          the better our AI can craft your unique brand identity.
        </p>
      </div>

      {/* Input Method Toggle */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm shadow-soft">
        <div className="flex gap-4 mb-6">
          <Button
            variant={inputMethod === 'text' ? 'brand' : 'outline'}
            onClick={() => setInputMethod('text')}
            className="flex-1"
          >
            <FileText className="h-4 w-4" />
            Write Your Vision
          </Button>
          <Button
            variant={inputMethod === 'upload' ? 'brand' : 'outline'}
            onClick={() => setInputMethod('upload')}
            className="flex-1"
          >
            <Upload className="h-4 w-4" />
            Upload Pitch Deck
          </Button>
        </div>

        {inputMethod === 'text' ? (
          <div className="space-y-4">
            <Label htmlFor="vision" className="text-base font-medium">
              Describe your startup vision *
            </Label>
            <Textarea
              id="vision"
              placeholder="Example: We're building a sustainable fashion marketplace that connects eco-conscious consumers with verified ethical brands. Our mission is to make sustainable fashion accessible and affordable while ensuring fair wages for producers. We target millennials and Gen Z who value environmental responsibility..."
              value={brandData.vision}
              onChange={(e) => handleVisionChange(e.target.value)}
              className="min-h-[200px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{brandData.vision.length} characters</span>
              <span>{canProceed ? '✓ Ready to proceed' : 'Minimum 50 characters required'}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Label className="text-base font-medium">Upload your pitch deck or business plan</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Drop your files here or click to browse</p>
                <p className="text-muted-foreground">Supports PDF, PowerPoint, Word documents</p>
              </label>
            </div>
            {brandData.vision && (
              <div className="mt-4">
                <Label className="text-base font-medium">Or refine your vision manually:</Label>
                <Textarea
                  placeholder="Refine or add to your vision..."
                  value={brandData.vision}
                  onChange={(e) => handleVisionChange(e.target.value)}
                  className="min-h-[120px] mt-2"
                />
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Example Visions */}
      <Card className="p-6 bg-white/40 backdrop-blur-sm shadow-soft">
        <h3 className="font-semibold mb-4 text-lg">Need inspiration? Try these examples:</h3>
        <div className="space-y-3">
          {exampleVisions.map((vision, index) => (
            <div 
              key={index}
              className="p-4 bg-white/60 rounded-lg border border-white/40 cursor-pointer hover:border-primary/50 transition-colors text-sm"
              onClick={() => handleVisionChange(vision)}
            >
              {vision}
            </div>
          ))}
        </div>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          variant="brand"
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="min-w-48"
        >
          Generate Brand Identity
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};