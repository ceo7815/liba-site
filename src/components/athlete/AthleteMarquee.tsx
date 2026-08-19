interface Props {
  items?: string[];
  variant?: "default" | "alt";
}

const DEFAULT_ITEMS = [
  "TRAIN", "RECOVER", "REPEAT", "LIBA-ATHLETE",
  "RUN", "LIFT", "RIDE", "FIGHT", "PLAY",
  "כל יום", "כל אימון", "כל פציעה", "מעטפת אחת",
];

const AthleteMarquee = ({ items = DEFAULT_ITEMS, variant = "default" }: Props) => {
  const repeated = [...items, ...items];
  return (
    <div className="athlete-marquee" dir="ltr" aria-hidden="true">
      <div className="athlete-marquee-track">
        {repeated.map((w, i) => {
          const mod = i % 4;
          const cls =
            mod === 0 ? "" :
            mod === 1 ? "outline" :
            mod === 2 ? "alt" : "alt2";
          return (
            <span key={i} className={`athlete-marquee-item ${cls} ${variant === "alt" ? "alt" : ""}`}>
              {w}
              <span className="dot" />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AthleteMarquee;
