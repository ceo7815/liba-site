import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import asaf from "@/assets/team/asaf-new.png";
import avichai from "@/assets/team/avichai.png";
import shahar from "@/assets/team/shahar.png";
import chen from "@/assets/team/chen.png";
import shai from "@/assets/team/shai.png";
import sofia from "@/assets/team/sofia.png";
import nivKobi from "@/assets/team/niv-kobi.png";
import yonatan from "@/assets/team/yonatan.png";
import uriel from "@/assets/team/uriel.png";
import simona from "@/assets/team/simona.png";
import nadav from "@/assets/team/nadav.png";
import daniel from "@/assets/team/daniel.png";
import mashi from "@/assets/team/mashi.png";
import nivLevran from "@/assets/team/niv-levran.png";
import doron from "@/assets/team/doron.png";

import yaniv from "@/assets/team/yaniv.png";

type Member = { name: string; role: string; img: string };

const team: Member[] = [
  { name: "אסף בר און", role: "מנכ״ל ומייסד", img: asaf },
  { name: "אביחי יוסיפוב", role: "אחראי מחלקת שיווק", img: avichai },
  { name: "שי בר און", role: "מנהל מחלקת מכירות", img: shai },
  { name: "חן בר און", role: "מנהל תיק לקוחות ויועץ משכנתאות", img: chen },
  { name: "אוריאל כהן", role: "סוכן ביטוח ואחראי מחלקת פיננסים ופנסיוני", img: uriel },
  { name: "שחר משה", role: "סוכנת ביטוח", img: shahar },
  { name: "סופיה יבדאייב", role: "אחראית מחלקת שירות ותביעות", img: sofia },
  { name: "משי מסלטי", role: "מנהלת מחלקת תפעול", img: mashi },
  { name: "יונתן וודובזוב", role: "מנהל מחלקת מיצוי זכויות", img: yonatan },
  { name: "נדב לוי", role: "מנהל מחלקת מיצוי זכויות", img: nadav },
  { name: "דורון שושני", role: "מנהל תיק לקוחות ומיצוי זכויות", img: doron },
  { name: "ניב קובי", role: "מנהל תיק לקוחות", img: nivKobi },
  { name: "ניב לב רן", role: "מנהל תיק לקוחות", img: nivLevran },
  { name: "דניאל כהן", role: "מנהל תיק לקוחות", img: daniel },
  { name: "סימונה ויינר", role: "מנהלת תיק לקוחות", img: simona },
  
  { name: "יניב אקרמן", role: "מנהל מערך הדיגיטל", img: yaniv },
];

const TeamCarousel = () => {
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="pt-4 pb-16 md:pt-6 md:pb-20 bg-background relative overflow-hidden">
      {/* subtle glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-brand-teal/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-24 w-72 h-72 rounded-full bg-brand-gold/10 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-sm text-muted-foreground">הצוות שלנו</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            האנשים שמאחורי <span className="text-brand-gold">ליבה</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            צוות מקצועי, מנוסה וזמין — כאן כדי ללוות אתכם בכל שלב.
          </p>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true, direction: "rtl", startIndex: 0 }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {team.map((m, i) => (
              <CarouselItem
                key={m.name}
                className="pl-4 md:pl-6 basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.05 }}
                  className="group"
                >
                  <div className="relative rounded-3xl overflow-hidden glass-premium p-3 hover:shadow-2xl transition-all duration-500">
                    {/* image */}
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-navy/5 to-brand-teal/5">
                      <img
                        src={m.img}
                        alt={`${m.name} — ${m.role}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* bottom gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* hover ring */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-brand-gold/50 transition-all duration-500" />
                    </div>

                    {/* name & role */}
                    <div className="pt-4 pb-2 px-2 text-center">
                      <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                        {m.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-snug min-h-[2.5rem]">
                        {m.role}
                      </p>
                    </div>

                    {/* accent line */}
                    <div className="absolute bottom-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent" />
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex -right-4 lg:-right-12 bg-background/80 backdrop-blur border-brand-teal/30 hover:bg-brand-teal hover:text-white hover:border-brand-teal" />
          <CarouselNext className="hidden md:flex -left-4 lg:-left-12 bg-background/80 backdrop-blur border-brand-teal/30 hover:bg-brand-teal hover:text-white hover:border-brand-teal" />
        </Carousel>
      </div>
    </section>
  );
};

export default TeamCarousel;
