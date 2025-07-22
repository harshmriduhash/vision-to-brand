import { useState } from "react";
import { Hero } from "@/components/Hero";
import { BrandWizard } from "@/components/BrandWizard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'wizard'>('hero');

  const startBrandCreation = () => {
    setCurrentView('wizard');
  };

  const backToHome = () => {
    setCurrentView('hero');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'hero' ? (
        <Hero onGetStarted={startBrandCreation} />
      ) : (
        <BrandWizard onBack={backToHome} />
      )}
    </div>
  );
};

export default Index;
