import { useEffect, useState } from "react";

interface Props {
  targetId: string;
  label?: string;
}

const AthleteStickyMobileCTA = ({ targetId, label = "בדוק התאמה" }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY) / (doc.scrollHeight - doc.clientHeight || 1);
      setVisible(scrolled > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`md:hidden fixed bottom-3 inset-x-3 z-40 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button onClick={onClick} className="athlete-cta-gradient w-full text-base">
        {label}
      </button>
    </div>
  );
};

export default AthleteStickyMobileCTA;
