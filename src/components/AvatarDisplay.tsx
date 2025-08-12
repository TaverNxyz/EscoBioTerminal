import { useEffect, useState } from "react";

interface AvatarDisplayProps {
  onComplete: () => void;
  show: boolean;
}

export const AvatarDisplay = ({ onComplete, show }: AvatarDisplayProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (show) {
      setActive(true);
      createDarkParticles();
      
      const timer = setTimeout(() => {
        setActive(false);
        setTimeout(onComplete, 1500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const createDarkParticles = () => {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'dark-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 10000);
    }
  };

  return (
    <div className={`avatar-display ${active ? 'active' : ''}`}>
      <div className="avatar-container">
        <div className="avatar-frame">
          <div 
            className="avatar-image"
            style={{
              backgroundImage: `url(/lovable-uploads/5991336c-bb16-4a71-884c-2a3e73be27be.png)`
            }}
          />
        </div>
        <div className="avatar-name">tcp.dns</div>
      </div>
    </div>
  );
};