import { motion } from "framer-motion";
import { Users, Search, FileCheck } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowWeWorkProps {
  title?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "היכרות קצרה",
    description: "מבינים מה חשוב לכם ומה מצב התיק היום.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "בדיקה מסודרת",
    description: "ממפים את השכבות, בודקים כפילויות/פערים, ומסדרים תמונת מצב.",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "המלצה שקופה",
    description: "מראים מה כדאי להשאיר, מה לשפר, ומה לשקול — עם הסבר פשוט.",
  },
];

const HowWeWork = ({ title = "איך אנחנו עובדים?", steps = defaultSteps }: HowWeWorkProps) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-accent mb-1">שלב {index + 1}</div>
              <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
