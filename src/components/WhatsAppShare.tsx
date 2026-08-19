import { Share2 } from "lucide-react";

interface WhatsAppShareProps {
  title: string;
  url?: string;
}

const WhatsAppShare = ({ title, url }: WhatsAppShareProps) => {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${shareUrl}`)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
    >
      <Share2 className="w-4 h-4" />
      שתפו בוואטסאפ
    </a>
  );
};

export default WhatsAppShare;
