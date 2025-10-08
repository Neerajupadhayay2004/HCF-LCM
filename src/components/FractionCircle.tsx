import { useEffect, useRef } from "react";

interface FractionCircleProps {
  numerator: number;
  denominator: number;
  size?: number;
  showLabel?: boolean;
  interactive?: boolean;
  filled?: boolean;
}

export const FractionCircle = ({
  numerator,
  denominator,
  size = 120,
  showLabel = true,
  interactive = false,
  filled = true,
}: FractionCircleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw pie slices
    const sliceAngle = (2 * Math.PI) / denominator;
    
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * sliceAngle - Math.PI / 2;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Fill based on numerator
      if (filled && i < numerator) {
        ctx.fillStyle = "hsl(217 91% 60%)";
      } else if (filled) {
        ctx.fillStyle = "hsl(220 14% 85%)";
      } else {
        ctx.fillStyle = "transparent";
      }
      ctx.fill();

      // Draw borders
      ctx.strokeStyle = "hsl(222.2 47.4% 11.2%)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw lines to center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(startAngle),
        centerY + radius * Math.sin(startAngle)
      );
      ctx.strokeStyle = "hsl(222.2 47.4% 11.2%)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "hsl(222.2 47.4% 11.2%)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [numerator, denominator, size, filled]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${interactive ? "cursor-move hover:scale-105 transition-transform" : ""}`}>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-lg"
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-foreground">
              {numerator}/{denominator}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
