import { useEffect, useState } from "react";

interface BootMessage {
  text: string;
  type: 'ok' | 'failed' | 'warning' | 'info' | 'normal';
}

const bootMessages: BootMessage[] = [
  { text: '[Finished] Checking battery state...', type: 'ok' },
  { text: 'Starting network services...', type: 'normal' },
  { text: '[Finished] tcp.dns [2.52] [DarkApple]...', type: 'ok' },
  { text: '[Warning] Starting GRUB boot loader...', type: 'warning' },
  { text: 'Reached target Graphical Interface...', type: 'normal' },
  { text: 'Started GNOME Display Manager...', type: 'normal' },
  { text: '[Warning] Starting system logging service...', type: 'warning' },
  { text: '[Warning] Starting udev...', type: 'warning' },
  { text: 'Started udev Kernel Device Manager...', type: 'normal' },
  { text: 'Checking disk for errors...', type: 'normal' },
  { text: '[Finished] Starting Light Display Manager...', type: 'ok' },
  { text: '[Finished] Stopping Light Display Manager...', type: 'ok' },
  { text: '[Error] Starting Dispatcher Service...', type: 'failed' },
  { text: '[Error] Reached target Multi-User System...', type: 'failed' },
  { text: 'Starting Daily apt download activities...', type: 'normal' },
  { text: 'Starting Network Manager...', type: 'normal' },
  { text: 'Started AppArmor initialization...', type: 'normal' },
  { text: 'Starting Wait for Network to be Configured...', type: 'normal' },
  { text: 'Starting Update UTMP about System Boot/Shutdown...', type: 'normal' },
  { text: '[Finished] Started Detect the available GPUs and deal with any system changes...', type: 'ok' },
  { text: 'Starting Hold until boot process finishes up...', type: 'normal' },
  { text: 'Starting Clean up any mess left by 0dns-up...', type: 'normal' },
  { text: '[Warning] Reached target Login Prompts...', type: 'warning' },
  { text: 'Initializing hardware monitoring...', type: 'normal' },
  { text: 'Starting ACPI event daemon...', type: 'normal' },
  { text: 'Starting D-Bus System Message Bus...', type: 'normal' },
  { text: '[Finished] Mounting local filesystems...', type: 'ok' },
  { text: 'Activating swap partition...', type: 'normal' },
  { text: '[Error] Starting Cleanup of Temporary Directories...', type: 'failed' },
  { text: '[Warning] Starting Set console font and keymap...', type: 'warning' },
  { text: '[Finished] Starting system kernel log daemon...', type: 'ok' },
  { text: '[Warning] Starting Virtualization daemon...', type: 'warning' },
  { text: '[Warning] Enabling swap space...', type: 'warning' },
  { text: 'Starting Apache Web Server...', type: 'normal' },
  { text: '[Warning] Starting SSH server...', type: 'warning' },
  { text: '[Finished] Starting MySQL database service...', type: 'ok' },
  { text: 'Mounting NFS filesystems...', type: 'normal' },
  { text: '[Finished] Setting up Logical Volume Manager...', type: 'ok' },
  { text: 'Starting Bluetooth services...', type: 'normal' },
  { text: 'Enabling network interfaces...', type: 'normal' },
  { text: 'Starting system time synchronization...', type: 'normal' },
  { text: 'Loading kernel modules...', type: 'normal' },
  { text: '[Warning] Starting firewall configuration...', type: 'warning' },
  { text: 'Initializing cryptographic services...', type: 'normal' },
  { text: 'Starting automatic crash report generation...', type: 'normal' },
  { text: 'Starting Disk Manager...', type: 'normal' },
  { text: 'Applying Kernel Live Patch...', type: 'normal' },
  { text: 'Press [key] to enter GRUB menu...', type: 'normal' },
  { text: '[Warning] Loading USB drivers...', type: 'warning' },
  { text: 'Starting Printer Service...', type: 'normal' },
  { text: '[Warning] Checking system time...', type: 'warning' },
  { text: 'Starting VPN service...', type: 'normal' },
  { text: 'Applying security updates...', type: 'normal' },
  { text: '[Finished] Profile system loaded...', type: 'ok' },
  { text: '[Info] tcp.dns ready...', type: 'info' },
  { text: '', type: 'normal' }, // Add spacing
  { text: 'Initializing connection protocol...', type: 'normal' },
  { text: 'Establishing secure tunnel...', type: 'normal' },
];

interface BootScreenProps {
  onComplete: () => void;
  selectedOption: string;
}

export const BootScreen = ({ onComplete, selectedOption }: BootScreenProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<BootMessage[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  // Add dynamic messages based on selection
  const getDynamicMessages = () => {
    const additionalMessages: BootMessage[] = [
      { text: '', type: 'normal' },
      { text: `[Info] Target selected: ${selectedOption}`, type: 'info' },
      { text: 'Configuring network protocols...', type: 'normal' },
      { text: 'Establishing encrypted connection...', type: 'normal' },
      { text: '[Finished] Connection ready', type: 'ok' },
    ];
    return [...bootMessages, ...additionalMessages];
  };

  const allMessages = getDynamicMessages();

  useEffect(() => {
    if (currentLine < allMessages.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, allMessages[currentLine]]);
        setProgress(prev => {
          const newProgress = prev + Math.random() * 3 + 1;
          return newProgress > 100 ? 100 : newProgress;
        });
        setCurrentLine(prev => prev + 1);

        // Random lightning during boot
        if (Math.random() < 0.08 && (window as any).createLightning) {
          (window as any).createLightning();
        }
      }, Math.random() * 80 + 50);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 2000);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentLine, onComplete, allMessages]);

  return (
    <div className={`boot-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="boot-header">
        <div>GNU GRUB tcp.dns version 2.52</div>
      </div>

      <div className="boot-content">
        {lines.map((line, index) => (
          <div key={index} className={`boot-line ${line.type}`}>
            {line.text}
          </div>
        ))}
      </div>

      <div className="boot-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-foreground mt-2.5">
          Welcome to tcp.dns version 2.52. Click an option to start the boot process.
        </div>
      </div>
    </div>
  );
};