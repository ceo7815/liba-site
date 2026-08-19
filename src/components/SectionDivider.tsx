interface SectionDividerProps {
  variant?: "angle" | "curve" | "slant" | "dots";
  from?: string;
  to?: string;
  className?: string;
}

const SectionDivider = ({ variant = "angle", from = "transparent", to = "transparent", className = "" }: SectionDividerProps) => {
  switch (variant) {
    case "angle":
      return (
        <div className={`relative h-16 md:h-24 overflow-hidden ${className}`}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <polygon points="0,0 1440,100 0,100" fill="currentColor" />
          </svg>
        </div>
      );
    case "curve":
      return (
        <div className={`relative h-16 md:h-24 overflow-hidden ${className}`}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>
      );
    case "slant":
      return (
        <div className={`relative h-12 md:h-20 overflow-hidden ${className}`}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <polygon points="0,80 1440,0 1440,80" fill="currentColor" />
          </svg>
        </div>
      );
    case "dots":
      return (
        <div className={`relative h-8 overflow-hidden flex items-center justify-center ${className}`}>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default SectionDivider;
