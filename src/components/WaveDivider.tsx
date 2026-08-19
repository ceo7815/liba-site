interface WaveDividerProps {
  variant?: "wave1" | "wave2" | "wave3";
  flip?: boolean;
  className?: string;
}

const paths = {
  wave1: "M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,0 L0,0 Z",
  wave2: "M0,32 C240,96 480,0 720,48 C960,96 1200,16 1440,48 L1440,0 L0,0 Z",
  wave3: "M0,48 C180,80 360,0 540,48 C720,96 900,16 1080,48 C1260,80 1440,32 1440,32 L1440,0 L0,0 Z",
};

const WaveDivider = ({ variant = "wave1", flip = false, className = "" }: WaveDividerProps) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
    <svg viewBox="0 0 1440 128" preserveAspectRatio="none" className="w-full h-12 md:h-20">
      <path d={paths[variant]} fill="currentColor" />
    </svg>
  </div>
);

export default WaveDivider;
