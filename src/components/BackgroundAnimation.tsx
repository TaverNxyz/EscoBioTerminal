import { useEffect } from "react";

export const BackgroundAnimation = () => {
  useEffect(() => {
    // Create matrix-like falling characters
    const createMatrixRain = () => {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '1';
      canvas.style.pointerEvents = 'none';
      canvas.style.opacity = '0.1';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");
      const font_size = 10;
      const columns = canvas.width / font_size;
      const drops: number[] = [];

      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = font_size + 'px Ubuntu Mono';

        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)];
          ctx.fillText(text, i * font_size, drops[i] * font_size);

          if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 35);
      
      return () => {
        clearInterval(interval);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      };
    };

    const cleanup = createMatrixRain();
    return cleanup;
  }, []);

  return (
    <>
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      
      {/* Pulsing grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="w-full h-full bg-grid-pattern opacity-5 animate-pulse" />
      </div>
    </>
  );
};