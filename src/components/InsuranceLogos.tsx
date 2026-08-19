import klal from "@/assets/logos/klal.png";
import meitav from "@/assets/logos/meitav.png";
import menora from "@/assets/logos/menora.png";
import phoenix from "@/assets/logos/phoenix.png";
import migdal from "@/assets/logos/migdal.png";
import harel from "@/assets/logos/harel.png";
import ayalon from "@/assets/logos/ayalon.png";
import hachshara from "@/assets/logos/hachshara.png";
import SectionTitle from "@/components/SectionTitle";

const companies = [
  { name: "כלל ביטוח", logo: klal },
  { name: "מיטב", logo: meitav },
  { name: "מנורה מבטחים", logo: menora },
  { name: "הפניקס", logo: phoenix },
  { name: "מגדל", logo: migdal },
  { name: "הראל", logo: harel },
  { name: "איילון", logo: ayalon },
  { name: "הכשרה", logo: hachshara },
];

interface InsuranceLogosProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}

const loopedCompanies = [...companies, ...companies];

const InsuranceLogos = ({
  title = "עובדים מול חברות הביטוח והגופים המובילים בישראל",
  subtitle = "אנחנו עובדים מול מגוון חברות ביטוח ובתי השקעות — כדי להתאים פתרון לפי צורך, לא לפי חברה אחת.",
  eyebrow,
}: InsuranceLogosProps) => {
  return (
    <section className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container mx-auto">
        <SectionTitle title={title} subtitle={subtitle} accent="המובילים" eyebrow={eyebrow} />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-14 md:w-20 bg-gradient-to-l from-transparent to-secondary/30 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 md:w-20 bg-gradient-to-r from-transparent to-secondary/30 z-10 pointer-events-none" />

        <div className="insurance-marquee" dir="ltr" aria-label="לוגואים של חברות ביטוח">
          <div className="insurance-marquee-track">
            {loopedCompanies.map((company, i) => (
              <div
                key={`${company.name}-${i}`}
                className="insurance-logo-card"
                title={company.name}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="insurance-logo-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceLogos;
