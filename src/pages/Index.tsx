import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { LightningOverlay } from "@/components/LightningOverlay";
import { BootScreen } from "@/components/BootScreen";
import { MainMenu } from "@/components/MainMenu";
import { Scanlines } from "@/components/Scanlines";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'boot' | 'connecting'>('menu');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleMenuSelection = (option: string, url: string) => {
    setSelectedOption(option);
    setCurrentScreen('boot');
    
    // After boot completes, redirect to the selected URL
    setTimeout(() => {
      setCurrentScreen('connecting');
      setTimeout(() => {
        window.location.href = url;
      }, 2000);
    }, 8000); // Boot sequence duration
  };

  const handleBootComplete = () => {
    setCurrentScreen('connecting');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <CustomCursor />
      <Scanlines />
      <LightningOverlay />
      
      {currentScreen === 'menu' && (
        <>
          <BackgroundAnimation />
          <MainMenu onSelection={handleMenuSelection} />
        </>
      )}
      
      {currentScreen === 'boot' && (
        <BootScreen 
          onComplete={handleBootComplete} 
          selectedOption={selectedOption}
        />
      )}
      
      {currentScreen === 'connecting' && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-background">
          <div className="text-center">
            <div className="text-4xl text-primary mb-4 animate-pulse">CONNECTING...</div>
            <div className="text-lg text-muted-foreground">Establishing secure connection...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
