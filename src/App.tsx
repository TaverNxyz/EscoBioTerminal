import React, { useState, useEffect } from 'react';
import AudioPermission from './components/AudioPermission';
import { useAudio } from './hooks/useAudio';
import './App.css';

const App: React.FC = () => {
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const { isAudioEnabled, playSound, playAudioFile } = useAudio();

  // Hide audio prompt once enabled
  useEffect(() => {
    if (isAudioEnabled) {
      setShowAudioPrompt(false);
      // Play a welcome sound or start your background music here
      // playSound(800, 200);
    }
  }, [isAudioEnabled, playSound]);

  const handlePlayTestSound = () => {
    playSound(440, 500, 'sine');
  };

  const handlePlayBackgroundMusic = async () => {
    try {
      // If you have background music in your public folder
      await playAudioFile('/your-background-music.mp3');
    } catch (error) {
      console.error('Failed to play background music:', error);
    }
  };

  return (
    <div className="App">
      {/* Audio Permission Modal */}
      {showAudioPrompt && !isAudioEnabled && (
        <div className="audio-modal-overlay">
          <div className="audio-modal">
            <AudioPermission 
              onAudioEnabled={() => setShowAudioPrompt(false)}
            />
          </div>
        </div>
      )}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
