interface WaveDividerProps {
  position?: "top" | "bottom";
  fillColor?: string;
  className?: string;
  variant?: "smooth" | "organic" | "gentle";
}

export const WaveDivider = ({ 
  position = "bottom", 
  fillColor = "hsl(var(--background))",
  className = "",
  variant = "smooth"
}: WaveDividerProps) => {
  const isTop = position === "top";
  
  const paths = {
    smooth: "M0,64 C320,120 640,20 960,80 C1280,140 1440,40 1440,40 L1440,0 L0,0 Z",
    organic: "M0,80 C180,120 360,40 540,70 C720,100 900,30 1080,60 C1260,90 1440,50 1440,50 L1440,0 L0,0 Z",
    gentle: "M0,40 C480,100 960,20 1440,60 L1440,0 L0,0 Z",
  };
  
  return (
    <div 
      className={`absolute left-0 right-0 w-full overflow-hidden pointer-events-none ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ 
        height: "80px",
        transform: isTop ? "rotate(180deg)" : "none"
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        style={{ fill: fillColor }}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
};

// Flowing organic divider with multiple layers
export const WaveDividerLayered = ({ 
  position = "bottom",
  className = ""
}: { position?: "top" | "bottom"; className?: string }) => {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute left-0 right-0 w-full overflow-hidden pointer-events-none ${
        isTop ? "top-0" : "bottom-0"
      } ${className}`}
      style={{ 
        height: "120px",
        transform: isTop ? "rotate(180deg)" : "none"
      }}
    >
      {/* Back layer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full opacity-30"
        style={{ fill: "hsl(var(--primary))" }}
      >
        <path d="M0,90 C240,50 480,110 720,70 C960,30 1200,100 1440,60 L1440,0 L0,0 Z" />
      </svg>
      
      {/* Middle layer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full opacity-50"
        style={{ fill: "hsl(var(--water-medium))" }}
      >
        <path d="M0,70 C360,110 720,30 1080,80 C1260,100 1440,50 1440,50 L1440,0 L0,0 Z" />
      </svg>
      
      {/* Front layer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        style={{ fill: "hsl(var(--background))" }}
      >
        <path d="M0,64 C320,100 640,30 960,70 C1280,110 1440,40 1440,40 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
};