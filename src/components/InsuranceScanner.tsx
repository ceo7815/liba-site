import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, ArrowLeft, RotateCcw } from "lucide-react";

type Step = "intro" | "q1" | "q2" | "q3" | "q4" | "result";

interface Answers {
  age: string;
  status: string;
  insuranceTypes: string[];
  lastCheck: string;
}

const InsuranceScanner = () => {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({
    age: "",
    status: "",
    insuranceTypes: [],
    lastCheck: "",
  });

  const getScore = () => {
    let protection = 50;
    let overpayment = 30;

    if (answers.insuranceTypes.length >= 3) protection += 25;
    else if (answers.insuranceTypes.length >= 1) protection += 10;

    if (answers.lastCheck === "never" || answers.lastCheck === "3+") overpayment += 30;
    if (answers.insuranceTypes.length >= 3) overpayment += 15;
    if (answers.status === "family") protection += 10;

    return {
      protection: Math.min(protection, 95),
      overpayment: Math.min(overpayment, 90),
    };
  };

  const reset = () => {
    setStep("intro");
    setAnswers({ age: "", status: "", insuranceTypes: [], lastCheck: "" });
  };

  return (
    <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <StepWrapper key="intro">
            <div className="text-center">
              <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">סורק ביטוח אישי</h3>
              <p className="text-lg text-muted-foreground mb-2">בדיקה כפולה – כיסוי + מחיר</p>
              <p className="text-muted-foreground mb-6">
                ב-90 שניות תקבלו תמונת מצב ראשונית: האם אתם מוגנים כמו שאתם חושבים — והאם יש סיכוי לתשלום מיותר/כפול.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
                <span>📊 2 מדדים: הגנה / תשלום</span>
                <span>💡 3 תובנות אישיות</span>
                <span>📋 אפשרות לקבל דוח מלא בשיחה קצרה</span>
              </div>
              <button
                onClick={() => setStep("q1")}
                className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                מתחילים את הסריקה
              </button>
            </div>
          </StepWrapper>
        )}

        {step === "q1" && (
          <StepWrapper key="q1">
            <QuestionHeader num={1} total={4} question="מה הגיל שלכם?" />
            <div className="grid grid-cols-2 gap-3">
              {["25-34", "35-44", "45-54", "55+"].map((opt) => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={answers.age === opt}
                  onClick={() => { setAnswers({ ...answers, age: opt }); setStep("q2"); }}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {step === "q2" && (
          <StepWrapper key="q2">
            <QuestionHeader num={2} total={4} question="מה הסטטוס המשפחתי?" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "single", label: "רווק/ה" },
                { value: "couple", label: "זוג ללא ילדים" },
                { value: "family", label: "משפחה עם ילדים" },
                { value: "empty-nest", label: "הילדים גדלו" },
              ].map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={answers.status === opt.value}
                  onClick={() => { setAnswers({ ...answers, status: opt.value }); setStep("q3"); }}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {step === "q3" && (
          <StepWrapper key="q3">
            <QuestionHeader num={3} total={4} question="אילו ביטוחים יש לכם? (אפשר לבחור כמה)" />
            <div className="grid grid-cols-2 gap-3 mb-6">
              {["בריאות פרטי", "חיים/ריסק", "משכנתא", "מחלות קשות", "דרך העבודה", "לא בטוח/ה"].map((opt) => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={answers.insuranceTypes.includes(opt)}
                  onClick={() => {
                    const types = answers.insuranceTypes.includes(opt)
                      ? answers.insuranceTypes.filter((t) => t !== opt)
                      : [...answers.insuranceTypes, opt];
                    setAnswers({ ...answers, insuranceTypes: types });
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setStep("q4")}
              disabled={answers.insuranceTypes.length === 0}
              className="w-full bg-accent text-accent-foreground py-3 rounded-full font-bold disabled:opacity-40 transition-opacity"
            >
              המשך <ArrowLeft className="inline w-4 h-4" />
            </button>
          </StepWrapper>
        )}

        {step === "q4" && (
          <StepWrapper key="q4">
            <QuestionHeader num={4} total={4} question="מתי בפעם האחרונה בדקתם את תיק הביטוח?" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "recent", label: "בשנה האחרונה" },
                { value: "1-3", label: "לפני 1-3 שנים" },
                { value: "3+", label: "לפני 3+ שנים" },
                { value: "never", label: "אף פעם" },
              ].map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={answers.lastCheck === opt.value}
                  onClick={() => { setAnswers({ ...answers, lastCheck: opt.value }); setStep("result"); }}
                />
              ))}
            </div>
          </StepWrapper>
        )}

        {step === "result" && (
          <StepWrapper key="result">
            <ResultView score={getScore()} answers={answers} onReset={reset} />
          </StepWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const QuestionHeader = ({ num, total, question }: { num: number; total: number; question: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
      <span>שאלה {num} מתוך {total}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(num / total) * 100}%` }} />
      </div>
    </div>
    <h4 className="font-heading text-xl font-bold">{question}</h4>
  </div>
);

const OptionButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
      selected
        ? "border-accent bg-accent/10 text-foreground"
        : "border-border hover:border-accent/50 text-foreground/80"
    }`}
  >
    {label}
  </button>
);

const ResultView = ({
  score,
  answers,
  onReset,
}: {
  score: { protection: number; overpayment: number };
  answers: Answers;
  onReset: () => void;
}) => (
  <div className="text-center">
    <h3 className="font-heading text-2xl font-bold mb-6">תוצאות הסריקה</h3>
    <div className="grid grid-cols-2 gap-6 mb-8">
      <ScoreCard label="מדד הגנה" value={score.protection} color={score.protection > 70 ? "text-green-500" : "text-amber-500"} icon={<Shield />} />
      <ScoreCard label="סיכון לתשלום מיותר" value={score.overpayment} color={score.overpayment > 50 ? "text-accent" : "text-green-500"} icon={<AlertTriangle />} />
    </div>

    <div className="bg-muted rounded-2xl p-6 mb-8 text-right space-y-3">
      <h4 className="font-heading font-bold text-lg mb-3">💡 תובנות אישיות</h4>
      {answers.lastCheck === "never" || answers.lastCheck === "3+" ? (
        <Insight text="עבר זמן רב מהבדיקה האחרונה – ייתכנו כפילויות או פערים בכיסוי." />
      ) : (
        <Insight text="בדיקה שוטפת זה יתרון. שווה לוודא שהתיק עדיין מתאים." />
      )}
      {answers.insuranceTypes.length >= 3 && (
        <Insight text="יש לכם מספר שכבות ביטוח – חשוב לוודא שאין חפיפה מיותרת." />
      )}
      {answers.status === "family" && (
        <Insight text="משפחה עם ילדים – כדאי לוודא שההגנה מותאמת להתחייבויות הנוכחיות." />
      )}
    </div>

    <p className="text-muted-foreground mb-6">רוצים דוח מלא? השאירו פרטים ונחזור לשיחה קצרה</p>

    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="/contact"
        className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
      >
        קבעו שיחת היכרות
      </a>
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-border text-foreground hover:bg-muted transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        סריקה חדשה
      </button>
    </div>
  </div>
);

const ScoreCard = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) => (
  <div className="bg-popover rounded-2xl p-5 border border-border">
    <div className={`w-10 h-10 mx-auto mb-2 ${color}`}>{icon}</div>
    <div className={`text-4xl font-heading font-black mb-1 ${color}`}>{value}%</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const Insight = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2">
    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
    <p className="text-sm">{text}</p>
  </div>
);

export default InsuranceScanner;
