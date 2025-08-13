import { useState, useEffect, useCallback, useRef } from "react";

interface MainMenuProps {
  onSelection: (option: string, url: string) => void;
}

interface MenuEntry {
  title: string;
  href: string;
  type: string;
}

const menuEntries: MenuEntry[] = [
  // Social Section
  { title: "Discord Profile", href: "https://discord.com/users/1256365134826311751", type: "Discord Profile" },
  { title: "GitHub Repository", href: "https://github.com/TaverNxyz", type: "GitHub Repository" },
  { title: "Steam Profile", href: "https://steamcommunity.com/id/terryyyyyyy/", type: "Steam Profile" },
  { title: "Crypto Exchange", href: "https://crypto.tavernappy.xyz", type: "Crypto Exchange" },
  // Projects Section
  { title: "RageLive Public", href: "https://publicized.ragelive.xyz/", type: "Project" },
  { title: "Plentiful Power", href: "https://plentifulpower.xyz/", type: "Project" },
  { title: "Plentiful Power Main", href: "https://main.plentifulpower.xyz/", type: "Project" },
  { title: "Plentiful Power Archive", href: "https://archive.plentifulpower.xyz/", type: "Project" },
];

export const MainMenu = ({ onSelection }: MainMenuProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bootTime, setBootTime] = useState(0);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio setup and prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAudioPrompt(true);
    }, 1500); // Show prompt after 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleAudioChoice = (enabled: boolean) => {
    setAudioEnabled(enabled);
    setShowAudioPrompt(false);
    
    if (enabled && audioRef.current) {
      audioRef.current.volume = 0.15; // 15% volume - neutral gothic ambiance
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setAudioEnabled(true);
      } else {
        audioRef.current.pause();
        setAudioEnabled(false);
      }
    }
  };

  // Lightning animation
  useEffect(() => {
    const createLightning = () => {
      const lightning = document.createElement('div');
      lightning.className = 'lightning-bolt';
      lightning.style.left = Math.random() * 100 + '%';
      lightning.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.lightning-container')?.appendChild(lightning);
      
      setTimeout(() => {
        lightning.remove();
      }, 3000);
    };

    const lightningInterval = setInterval(createLightning, 2000 + Math.random() * 3000);
    return () => clearInterval(lightningInterval);
  }, []);

  // Boot timer
  useEffect(() => {
    const timer = setInterval(() => {
      setBootTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : menuEntries.length - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < menuEntries.length - 1 ? prev + 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        const selected = menuEntries[selectedIndex];
        if ((window as any).createLightning) {
          (window as any).createLightning();
        }
        onSelection(selected.type, selected.href);
        break;
    }
  }, [selectedIndex, onSelection]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getSectionTitle = (index: number) => {
    if (index <= 3) return index === 0 ? "SOCIAL PROFILES" : null;
    if (index === 4) return "DEVELOPMENT PROJECTS";
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-mono overflow-hidden">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio Control Prompt */}
      {showAudioPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-blue-900 border-2 border-blue-500 p-6 rounded-lg text-center max-w-md">
            <div className="text-yellow-400 font-bold mb-4">🎵 AUDIO SUBSYSTEM DETECTED</div>
            <div className="text-gray-300 mb-4">
              Enable dark ambient soundtrack for your terminal session?
            </div>
            <div className="text-sm text-gray-400 mb-6">
              (Low volume ambient music will play in background)
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAudioChoice(true)}
                className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded font-bold"
              >
                ENABLE AUDIO
              </button>
              <button
                onClick={() => handleAudioChoice(false)}
                className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded font-bold"
              >
                SILENT MODE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightning Background */}
      <div className="lightning-container absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10"></div>
      </div>

      {/* GRUB Header */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-blue-600 text-white">
        <div className="text-center">
          <div className="text-lg font-bold">GNU GRUB version 2.06</div>
          <div className="text-sm">tcp.dns Boot Manager</div>
        </div>
      </div>

      {/* Main GRUB Menu */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-8">
        {/* Large Avatar Section - Positioned above everything */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-48 h-48 rounded-lg border-4 border-red-500 overflow-hidden shadow-2xl bg-gray-800">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(/lovable-uploads/5991336c-bb16-4a71-884c-2a3e73be27be.png)`,
                  filter: 'none'
                }}
              />
            </div>
            {/* Subtle dark glow effect */}
            <div className="absolute inset-0 w-48 h-48 rounded-lg border-4 border-red-500 shadow-lg shadow-red-500/20"></div>
          </div>
        </div>
        
        {/* Boot info */}
        <div className="mb-8 text-gray-400 text-sm">
          <div>Booting tcp.dns Terminal Interface v2.52...</div>
          <div>Boot time: {bootTime}s</div>
          <div className="mt-2">Use ↑ and ↓ to select which entry is highlighted.</div>
          <div>Press ENTER to boot the selected OS, 'e' to edit the</div>
          <div>commands before booting or 'c' for a command-line.</div>
        </div>

        {/* Menu entries */}
        <div className="grub-menu-container bg-blue-900/20 border border-blue-500/50 rounded p-4">
          {menuEntries.map((entry, index) => {
            const sectionTitle = getSectionTitle(index);
            return (
              <div key={index}>
                {sectionTitle && (
                  <div className="text-yellow-400 font-bold text-sm mb-2 mt-4 first:mt-0">
                    ═══ {sectionTitle} ═══
                  </div>
                )}
                <div
                  className={`grub-entry p-2 mb-1 rounded cursor-pointer transition-all duration-200 ${
                    selectedIndex === index
                      ? 'bg-white text-black font-bold shadow-lg transform scale-[1.02]'
                      : 'bg-transparent text-gray-300 hover:bg-blue-800/30'
                  }`}
                  onClick={() => {
                    setSelectedIndex(index);
                    if ((window as any).createLightning) {
                      (window as any).createLightning();
                    }
                    onSelection(entry.type, entry.href);
                  }}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {selectedIndex === index ? '►' : ' '}
                    </span>
                    <span>{entry.title}</span>
                    {entry.type === "Crypto Exchange" && (
                      <span className="ml-2 text-yellow-400">₿</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-gray-500 text-xs text-center">
          <div>The highlighted entry will be executed automatically in 30s.</div>
          <div className="mt-2">GNU GRUB comes with ABSOLUTELY NO WARRANTY.</div>
        </div>
      </div>

      {/* Audio Control Button */}
      <button
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-40 bg-purple-700/50 hover:bg-purple-600/70 border border-purple-500 px-3 py-1 rounded text-xs font-bold transition-all"
        title="Toggle Audio"
      >
        {audioEnabled ? '🔊' : '🔇'}
      </button>

      {/* User info panel - moved to left side */}
      <div className="absolute top-20 left-8">
        <div className="bg-gray-900/50 border border-gray-600/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-red-400 font-bold text-lg mb-1">tcp.dns</div>
          <div className="text-gray-300 text-sm">System Administrator</div>
          <div className="text-gray-400 text-xs mt-1">Terminal Interface v2.52</div>
          <div className="text-red-400 text-xs mt-2">
            ● Online • Authenticated
          </div>
        </div>
      </div>

      <style jsx>{`
        .lightning-container {
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 255, 0.1) 0%, transparent 50%);
        }
        
        .lightning-bolt {
          position: absolute;
          width: 2px;
          height: 100vh;
          background: linear-gradient(180deg, 
            transparent 0%, 
            rgba(147, 51, 234, 0.8) 20%, 
            rgba(236, 72, 153, 0.9) 50%, 
            rgba(59, 130, 246, 0.8) 80%, 
            transparent 100%);
          animation: lightning 2s ease-in-out;
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
        }
        
        @keyframes lightning {
          0% { opacity: 0; transform: translateY(-100%) scaleY(0); }
          10% { opacity: 1; transform: translateY(0%) scaleY(1); }
          20% { opacity: 0.8; }
          30% { opacity: 1; }
          40% { opacity: 0.9; }
          50% { opacity: 1; }
          60% { opacity: 0; }
          100% { opacity: 0; transform: translateY(0%) scaleY(1); }
        }
        
        .grub-menu-container {
          backdrop-filter: blur(10px);
          background: rgba(30, 58, 138, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .grub-entry:hover {
          background: rgba(59, 130, 246, 0.2) !important;
        }
      `}</style>
    </div>
  );
};
