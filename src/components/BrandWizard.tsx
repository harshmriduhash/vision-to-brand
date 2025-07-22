import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { VisionInput } from "./wizard/VisionInput";
import { BrandSuggestions } from "./wizard/BrandSuggestions";
import { ColorPalette } from "./wizard/ColorPalette";
import { LogoGeneration } from "./wizard/LogoGeneration";
import { BrandPreview } from "./wizard/BrandPreview";

const steps = [
  { id: 1, title: "Vision Input", description: "Share your startup vision" },
  { id: 2, title: "Brand Identity", description: "AI-generated suggestions" },
  { id: 3, title: "Color Palette", description: "Perfect color combinations" },
  { id: 4, title: "Logo Design", description: "Custom logo generation" },
  { id: 5, title: "Brand Kit", description: "Complete brand preview" }
];

export interface BrandData {
  vision: string;
  name: string;
  tagline: string;
  tone: string;
  industry: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  logoUrl?: string;
  moodboardUrl?: string;
}

interface BrandWizardProps {
  onBack: () => void;
}

export const BrandWizard = ({ onBack }: BrandWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [brandData, setBrandData] = useState<BrandData>({
    vision: "",
    name: "",
    tagline: "",
    tone: "",
    industry: "",
    colors: {
      primary: "#6366f1",
      secondary: "#f59e0b",
      accent: "#ec4899",
      neutral: "#6b7280"
    },
    fonts: {
      primary: "Inter",
      secondary: "Playfair Display"
    }
  });

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VisionInput 
            brandData={brandData} 
            setBrandData={setBrandData} 
            onNext={nextStep} 
          />
        );
      case 2:
        return (
          <BrandSuggestions 
            brandData={brandData} 
            setBrandData={setBrandData} 
            onNext={nextStep} 
          />
        );
      case 3:
        return (
          <ColorPalette 
            brandData={brandData} 
            setBrandData={setBrandData} 
            onNext={nextStep} 
          />
        );
      case 4:
        return (
          <LogoGeneration 
            brandData={brandData} 
            setBrandData={setBrandData} 
            onNext={nextStep} 
          />
        );
      case 5:
        return (
          <BrandPreview 
            brandData={brandData} 
            setBrandData={setBrandData} 
            onStartOver={() => {
              setCurrentStep(1);
              setBrandData({
                vision: "",
                name: "",
                tagline: "",
                tone: "",
                industry: "",
                colors: {
                  primary: "#6366f1",
                  secondary: "#f59e0b",
                  accent: "#ec4899",
                  neutral: "#6b7280"
                },
                fonts: {
                  primary: "Inter",
                  secondary: "Playfair Display"
                }
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BF</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                    BrandForge
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground mb-1">
                {Math.round(progress)}% Complete
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-soft">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300
                  ${currentStep === step.id 
                    ? 'bg-gradient-brand text-white shadow-brand' 
                    : currentStep > step.id 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-white text-muted-foreground border border-border'
                  }
                `}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-0.5 mx-2 transition-all duration-300
                    ${currentStep > step.id ? 'bg-success' : 'bg-border'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};