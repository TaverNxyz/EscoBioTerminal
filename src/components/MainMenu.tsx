import { useState } from "react";

interface MainMenuProps {
  onSelection: (option: string, url: string) => void;
}

interface MenuOptionProps {
  href: string;
  children: React.ReactNode;
  type: string;
  onSelect: (option: string, url: string) => void;
}

const MenuOption = ({ href, children, type, onSelect }: MenuOptionProps) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Lightning effect on click
    if ((window as any).createLightning) {
      (window as any).createLightning();
    }
    
    onSelect(type, href);
  };

  return (
    <div
      className={`linux-menu-option ${hovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="option-prefix">[ </span>
      <span className="option-text">{children}</span>
      <span className="option-suffix"> ]</span>
    </div>
  );
};

export const MainMenu = ({ onSelection }: MainMenuProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-background">
      {/* Avatar section */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <div className="avatar-frame-small">
          <div 
            className="avatar-image-small"
            style={{
              backgroundImage: `url(/lovable-uploads/5991336c-bb16-4a71-884c-2a3e73be27be.png)`
            }}
          />
        </div>
        <div className="text-center mt-4">
          <div className="text-2xl text-foreground font-bold glitch" data-text="tcp.dns">
            tcp.dns
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
            Terminal Interface v2.52
          </div>
        </div>
      </div>

      {/* Linux-style menu */}
      <div className="linux-terminal-menu">
        <div className="terminal-header">
          <div className="terminal-title">
            <span className="text-success">root@tcp.dns</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-info">~</span>
            <span className="text-foreground">$ ./select_destination.sh</span>
          </div>
        </div>
        
        <div className="terminal-content">
          <div className="text-muted-foreground mb-4">
            <span className="text-warning">[INFO]</span> Available destinations detected...
          </div>
          
          {/* Social/Profile Section */}
          <div className="text-muted-foreground mb-2">
            <span className="text-info">[SOCIAL]</span> Personal profiles and accounts:
          </div>
          
          <div className="menu-options-linux mb-6">
            <MenuOption 
              href="https://discord.com/users/1256365134826311751" 
              type="Discord Profile"
              onSelect={onSelection}
            >
              Discord Profile
            </MenuOption>
            <MenuOption 
              href="https://github.com/TaverNxyz" 
              type="GitHub Repository"
              onSelect={onSelection}
            >
              GitHub Repository
            </MenuOption>
            <MenuOption 
              href="https://steamcommunity.com/id/terryyyyyyy/" 
              type="Steam Profile"
              onSelect={onSelection}
            >
              Steam Profile
            </MenuOption>
            <MenuOption 
              href="https://crypto.tavernappy.xyz" 
              type="Crypto Exchange"
              onSelect={onSelection}
            >
              Crypto Exchange <span className="crypto-coin"></span>
            </MenuOption>
          </div>

          {/* Projects Section */}
          <div className="text-muted-foreground mb-2">
            <span className="text-success">[PROJECTS]</span> Development portfolio and work:
          </div>
          
          <div className="menu-options-linux mb-6">
            <MenuOption 
              href="https://publicized.ragelive.xyz/" 
              type="Project"
              onSelect={onSelection}
            >
              RageLive Public
            </MenuOption>
            <MenuOption 
              href="https://plentifulpower.xyz/" 
              type="Project"
              onSelect={onSelection}
            >
              Plentiful Power
            </MenuOption>
            <MenuOption 
              href="https://main.plentifulpower.xyz/" 
              type="Project"
              onSelect={onSelection}
            >
              Plentiful Power Main
            </MenuOption>
            <MenuOption 
              href="https://archive.plentifulpower.xyz/" 
              type="Project"
              onSelect={onSelection}
            >
              Plentiful Power Archive
            </MenuOption>
          </div>
          
          <div className="terminal-prompt">
            <span className="text-success">root@tcp.dns</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-info">~</span>
            <span className="text-foreground">$ </span>
            <span className="cursor-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};
