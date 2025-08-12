import { useEffect, useState } from "react";

export const LightningOverlay = () => {
  const [lightning, setLightning] = useState<Array<{ id: number; left: string }>>([]);

  const createLightning = () => {
    const newLightning = {
      id: Date.now() + Math.random(),
      left: Math.random() * 100 + '%',
    };
    
    setLightning(prev => [...prev, newLightning]);
    
    setTimeout(() => {
      setLightning(prev => prev.filter(l => l.id !== newLightning.id));
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        createLightning();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Expose createLightning globally
  useEffect(() => {
    (window as any).createLightning = createLightning;
  }, []);

  return (
    <div className="lightning-overlay">
      {lightning.map(strike => (
        <div
          key={strike.id}
          className="lightning"
          style={{ left: strike.left }}
        />
      ))}
    </div>
  );
};