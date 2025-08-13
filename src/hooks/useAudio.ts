// src/hooks/useAudio.ts
// Create this file in your project
import { useState, useRef, useCallback } from 'react';

interface AudioHookReturn {
  isAudioEnabled: boolean;
  enableAudio: () => Promise<void>;
  playSound: (frequency: number, duration: number, type?: OscillatorType) => void;
  playAudioFile: (audioSrc: string) => Promise<void>;
  audioError: string | null;
}

export const useAudio = (): AudioHookReturn => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const enableAudio = useCallback(async () => {
    try {
      // Create AudioContext - this MUST be called from a user interaction
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('AudioContext not supported');
      }

      audioContextRef.current = new AudioContextClass();

      // Resume if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      setIsAudioEnabled(true);
      setAudioError(null);
      console.log('Audio enabled successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown audio error';
      setAudioError(errorMessage);
      console.error('Failed to enable audio:', error);
    }
  }, []);

  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !isAudioEnabled) {
      console.warn('Audio not enabled');
      return;
    }

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = type;

      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration / 1000);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [isAudioEnabled]);

  const playAudioFile = useCallback(async (audioSrc: string): Promise<void> => {
    try {
      const audio = new Audio(audioSrc);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio file:', error);
      throw error;
    }
  }, []);

  return {
    isAudioEnabled,
    enableAudio,
    playSound,
    playAudioFile,
    audioError
  };
};
