import { Facebook, Instagram } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const whatsappHref = `https://wa.me/972${siteConfig.whatsapp.replace(/^0/, "")}`;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const links = [
  {
    name: "פייסבוק",
    href: siteConfig.social.facebook,
    icon: Facebook,
    className: "bg-[hsl(205,65%,22%)] hover:bg-[hsl(205,65%,18%)] shadow-[0_10px_24px_-12px_hsl(205_65%_18%/0.65)]",
  },
  {
    name: "אינסטגרם",
    href: siteConfig.social.instagram,
    icon: Instagram,
    className:
      "bg-[linear-gradient(135deg,#f58529_0%,#dd2a7b_48%,#8134af_100%)] hover:brightness-110 shadow-[0_10px_24px_-12px_rgba(221,42,123,0.55)]",
  },
  {
    name: "וואטסאפ",
    href: whatsappHref,
    icon: WhatsAppIcon,
    className: "bg-[hsl(175,60%,36%)] hover:bg-[hsl(175,60%,32%)] shadow-[0_10px_24px_-12px_hsl(175_60%_36%/0.65)]",
  },
] as const;

type SocialButtonsProps = {
  light?: boolean;
  align?: "center" | "start";
  layout?: "row" | "dock";
};

const SocialButtons = ({ light = false, align = "center", layout = "row" }: SocialButtonsProps) => {
  const isDock = layout === "dock";

  return (
    <div
      className={
        isDock
          ? "fixed left-4 top-1/2 z-[54] flex -translate-y-1/2 flex-col gap-3"
          : `flex items-center gap-3 md:gap-4 ${align === "start" ? "justify-start" : "justify-center"}`
      }
    >
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            title={item.name}
            className={`inline-flex items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105 ${
              isDock
                ? "h-11 w-11 hover:translate-x-0.5 md:h-12 md:w-12"
                : "h-12 w-12 hover:-translate-y-0.5 md:h-14 md:w-14"
            } ${item.className} ${light ? "ring-1 ring-white/20" : ""}`}
          >
            <Icon className={isDock ? "h-5 w-5" : "h-5 w-5 md:h-6 md:w-6"} strokeWidth={2.25} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialButtons;
