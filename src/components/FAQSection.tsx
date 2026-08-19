import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

const FAQSection = ({ title = "שאלות נפוצות", items }: FAQSectionProps) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="glass-card px-6 border-none"
            >
              <AccordionTrigger className="text-right font-heading font-semibold text-base hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
