// src/hooks/useAudio.ts - Complete version with file playback
import { useState, useRef, useCallback } from 'react';

interface AudioHookReturn {
  isAudioEnabled: boolean;
  enableAudio: () => Promise<void>;
  playSound: (frequency: number, duration: number, type?: OscillatorType) => void;
  playAudioFile: (audioSrc: string) => Promise<void>;
  playBackgroundMusic: (audioSrc: string, loop?: boolean) => Promise<HTMLAudioElement>;
  stopAudio: (audio?: HTMLAudioElement) => void;
  audioError: string | null;
}

export const useAudio = (): AudioHookReturn => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const enableAudio = useCallback(async () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('AudioContext not supported');
      }

      audioContextRef.current = new AudioContextClass();

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

  // Generate sounds (beeps, tones)
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

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration / 1000);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [isAudioEnabled]);

  // Play audio files (MP3, WAV, etc.) - Simple version
  const playAudioFile = useCallback(async (audioSrc: string): Promise<void> => {
    if (!isAudioEnabled) {
      throw new Error('Audio not enabled');
    }

    try {
      // Create HTML5 Audio element
      const audio = new Audio(audioSrc);
      
      // Wait for it to load and play
      await new Promise<void>((resolve, reject) => {
        audio.addEventListener('loadeddata', () => {
          audio.play()
            .then(() => resolve())
            .catch(reject);
        });
        audio.addEventListener('error', () => {
          reject(new Error(`Failed to load audio: ${audioSrc}`));
        });
      });
    } catch (error) {
      console.error('Error playing audio file:', error);
      throw error;
    }
  }, [isAudioEnabled]);

  // Play background music with loop option
  const playBackgroundMusic = useCallback(async (audioSrc: string, loop: boolean = true): Promise<HTMLAudioElement> => {
    if (!isAudioEnabled) {
      throw new Error('Audio not enabled');
    }

    try {
      // Stop current background music if playing
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      // Create new audio element
      const audio = new Audio(audioSrc);
      audio.loop = loop;
      audio.volume = 0.5; // Set volume to 50%
      
      // Store reference so we can stop it later
      currentAudioRef.current = audio;

      // Play the audio
      await audio.play();
      
      return audio;
    } catch (error) {
      console.error('Error playing background music:', error);
      throw error;
    }
  }, [isAudioEnabled]);

  // Stop audio
  const stopAudio = useCallback((audio?: HTMLAudioElement) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    } else if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  }, []);

  return {
    isAudioEnabled,
    enableAudio,
    playSound,
    playAudioFile,
    playBackgroundMusic,
    stopAudio,
    audioError
  };
};
