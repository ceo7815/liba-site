import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type PhoneOtpDialogProps = {
  open: boolean;
  phone: string;
  code: string;
  error: string | null;
  sending: boolean;
  verifying: boolean;
  resendIn: number;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  onResend: () => void;
  onCancel: () => void;
};

const maskPhone = (phone: string) => {
  if (phone.length < 7) return phone;
  return `${phone.slice(0, 3)}-***${phone.slice(-4)}`;
};

const PhoneOtpDialog = ({
  open,
  phone,
  code,
  error,
  sending,
  verifying,
  resendIn,
  onCodeChange,
  onVerify,
  onResend,
  onCancel,
}: PhoneOtpDialogProps) => (
  <Dialog open={open} onOpenChange={(next) => { if (!next) onCancel(); }}>
    <DialogContent className="max-w-md text-right" dir="rtl">
      <DialogHeader className="text-right space-y-2">
        <DialogTitle>אימות מספר הטלפון</DialogTitle>
        <DialogDescription>
          {sending
            ? "שולחים אליכם קוד ב-SMS..."
            : `שלחנו קוד בן 6 ספרות ל-${maskPhone(phone)}. הזינו אותו כדי להמשיך.`}
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center py-2" dir="ltr">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={onCodeChange}
          disabled={sending || verifying}
          autoFocus
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && <p className="text-destructive text-sm text-center">{error}</p>}

      <button
        type="button"
        onClick={onVerify}
        disabled={sending || verifying || code.replace(/\D/g, "").length !== 6}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-full font-bold disabled:opacity-50"
      >
        {(sending || verifying) && <Loader2 className="w-4 h-4 animate-spin" />}
        {verifying ? "מאמתים..." : "אימות והמשך"}
      </button>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <button
          type="button"
          onClick={onResend}
          disabled={sending || verifying || resendIn > 0}
          className="underline disabled:no-underline disabled:opacity-50"
        >
          {resendIn > 0 ? `שליחה מחדש בעוד ${resendIn}` : "שליחה מחדש"}
        </button>
        <button type="button" onClick={onCancel} className="hover:text-foreground">
          ביטול
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

export default PhoneOtpDialog;
