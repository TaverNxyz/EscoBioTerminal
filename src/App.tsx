// src/App.tsx - Replace your entire file with this
import React, { useState } from 'react';

const App: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  const enableAudio = async () => {
    try {
      // Create audio context - MUST be from user click
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Start background music
      const audio = new Audio('/background-music.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(e => console.log('No background music file found'));

      setAudioEnabled(true);
      setShowPrompt(false);
    } catch (error) {
      console.error('Audio failed:', error);
    }
  };

  if (showPrompt && !audioEnabled) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <div style={{
          background: '#1a1a1a',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2>Enable Audio</h2>
          <p>This site uses audio</p>
          <button 
            onClick={enableAudio}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔊 Enable Audio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Esco BootLoader ROM</h1>
      <p>Elegant Retardation In The Form Of A Website</p>
      {audioEnabled && <p>✓ Audio is enabled</p>}
    </div>
  );
};

export default App;
