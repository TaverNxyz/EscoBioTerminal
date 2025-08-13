// src/components/AudioPermission.tsx
// Create this file in your project
import React from 'react';
import { useAudio } from '../hooks/useAudio';

interface AudioPermissionProps {
  onAudioEnabled?: () => void;
  className?: string;
}

const AudioPermission: React.FC<AudioPermissionProps> = ({ onAudioEnabled, className = '' }) => {
  const { isAudioEnabled, enableAudio, audioError } = useAudio();

  const handleEnableAudio = async () => {
    await enableAudio();
    if (onAudioEnabled) {
      onAudioEnabled();
    }
  };

  if (isAudioEnabled) {
    return (
      <div className={`audio-status success ${className}`}>
        <span>🔊 Audio Enabled</span>
      </div>
    );
  }

  return (
    <div className={`audio-permission ${className}`}>
      <div className="audio-prompt">
        <h3>Enable Audio</h3>
        <p>This site uses audio. Click to enable sound.</p>
        <button 
          onClick={handleEnableAudio}
          className="enable-audio-btn"
        >
          🔊 Enable Audio
        </button>
        {audioError && (
          <div className="audio-error">
            Error: {audioError}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPermission;
