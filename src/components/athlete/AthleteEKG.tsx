const AthleteEKG = ({ className = "" }: { className?: string }) => (
  <svg
    className={`athlete-ekg w-full ${className}`}
    viewBox="0 0 600 80"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ekgGrad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="hsl(22, 100%, 55%)" />
        <stop offset="50%" stopColor="hsl(320, 100%, 60%)" />
        <stop offset="100%" stopColor="hsl(75, 100%, 55%)" />
      </linearGradient>
    </defs>
    <path
      d="M0 40 L120 40 L150 40 L160 20 L175 60 L190 10 L205 70 L225 40 L320 40 L335 25 L350 55 L365 15 L380 65 L400 40 L600 40"
      stroke="url(#ekgGrad)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AthleteEKG;
