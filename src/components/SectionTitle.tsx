import { motion, useReducedMotion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  accent?: string;
  eyebrow?: string;
  light?: boolean;
};

const SectionTitle = ({ title, subtitle, accent, eyebrow, light }: SectionTitleProps) => {
  const reduceMotion = useReducedMotion();
  const parts = accent ? title.split(accent) : null;

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      {eyebrow && (
        <motion.p
          variants={item}
          className={`mb-3 inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] md:text-xs ${
            light ? "text-brand-teal" : "text-brand-teal"
          }`}
        >
          <span className="h-px w-5 bg-current opacity-70" />
          {eyebrow}
          <span className="h-px w-5 bg-current opacity-70" />
        </motion.p>
      )}

      <motion.h2
        variants={item}
        className={`font-heading text-3xl font-black md:text-4xl ${subtitle ? "mb-3" : "mb-0"} ${
          light ? "text-primary-foreground" : ""
        }`}
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="relative inline-block pb-1">
              <span className={light ? "text-accent" : "text-gradient-accent"}>{accent}</span>
              <motion.span
                aria-hidden
                className="section-title-underline"
                initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {!parts && (
        <motion.span
          aria-hidden
          className="section-title-underline section-title-underline--short mx-auto mt-3 block"
          initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {subtitle && (
        <motion.p
          variants={item}
          className={`mt-3 text-lg leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
