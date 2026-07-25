import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Sparkles,
  Building2,
  Target,
  Goal,
  FileText,
  Wallet,
  User,
  Globe,
  Mail,
  Calendar,
} from 'lucide-react';
import { SectionHeading, Reveal } from '../Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

type BusinessType = 'Local business' | 'E-commerce' | 'Professional services' | 'Agency' | 'Other';
type AutomateProcess =
  | 'Lead Generation'
  | 'Customer Support'
  | 'Email Automation'
  | 'Data Collection'
  | 'Internal Processes'
  | 'Other';
type Goal =
  | 'Get more customers'
  | 'Save time'
  | 'Reduce manual work'
  | 'Improve operations'
  | 'Scale business';
type Timeline = 'ASAP' | '1 Month' | '3 Months' | 'Exploring';
type Budget = 'Under $500' | '$500 - $2,000' | '$2,000 - $5,000' | '$5,000+';

interface FormState {
  fullName: string;
  company: string;
  email: string;
  website: string;
  businessType: BusinessType | '';
  processes: AutomateProcess[];
  goal: Goal | '';
  projectDetails: string;
  budget: Budget | '';
  timeline: Timeline | '';
}

const initialState: FormState = {
  fullName: '',
  company: '',
  email: '',
  website: '',
  businessType: '',
  processes: [],
  goal: '',
  projectDetails: '',
  budget: '',
  timeline: '',
};

const TOTAL_STEPS = 6;

const businessTypes: { value: BusinessType; icon: typeof Building2 }[] = [
  { value: 'Local business', icon: Building2 },
  { value: 'E-commerce', icon: Globe },
  { value: 'Professional services', icon: User },
  { value: 'Agency', icon: Target },
  { value: 'Other', icon: Sparkles },
];

const processOptions: { value: AutomateProcess; icon: typeof Target }[] = [
  { value: 'Lead Generation', icon: Target },
  { value: 'Customer Support', icon: Mail },
  { value: 'Email Automation', icon: Mail },
  { value: 'Data Collection', icon: FileText },
  { value: 'Internal Processes', icon: Target },
  { value: 'Other', icon: Sparkles },
];

const goalOptions: { value: Goal; icon: typeof Goal }[] = [
  { value: 'Get more customers', icon: Target },
  { value: 'Save time', icon: User },
  { value: 'Reduce manual work', icon: Sparkles },
  { value: 'Improve operations', icon: Mail },
  { value: 'Scale business', icon: ArrowRight },
];

const budgetOptions: Budget[] = ['Under $500', '$500 - $2,000', '$2,000 - $5,000', '$5,000+'];
const timelineOptions: { value: Timeline; icon: typeof Calendar }[] = [
  { value: 'ASAP', icon: Calendar },
  { value: '1 Month', icon: Calendar },
  { value: '3 Months', icon: Calendar },
  { value: 'Exploring', icon: Calendar },
];

export default function Discovery() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  };

  const toggleProcess = (p: AutomateProcess) => {
    setForm((f) => ({
      ...f,
      processes: f.processes.includes(p)
        ? f.processes.filter((x) => x !== p)
        : [...f.processes, p],
    }));
    setError(null);
  };

  const validateStep = (): boolean => {
    setError(null);
    switch (step) {
      case 0:
        if (!form.fullName.trim() || !form.company.trim() || !form.email.trim()) {
          setError('Please fill in your name, company and email to continue.');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          setError('Please enter a valid email address.');
          return false;
        }
        return true;
      case 1:
        if (!form.businessType) {
          setError('Select a business type to continue.');
          return false;
        }
        return true;
      case 2:
        if (form.processes.length === 0) {
          setError('Select at least one process to automate.');
          return false;
        }
        return true;
      case 3:
        if (!form.goal) {
          setError('Choose your main goal to continue.');
          return false;
        }
        return true;
      case 4:
        if (form.projectDetails.trim().length < 12) {
          setError('Tell us a little more (at least a sentence).');
          return false;
        }
        return true;
      case 5:
        if (!form.budget || !form.timeline) {
          setError('Select both a budget and a timeline.');
          return false;
        }
        return true;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      submittedAt: new Date().toISOString(),
      ...form,
    };

    try {
      // Webhook endpoint — set via VITE_N8N_WEBHOOK_URL to route into an n8n workflow.
      const endpoint = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // No endpoint configured yet — simulate a brief network round-trip.
        await new Promise((r) => setTimeout(r, 1100));
      }
      setSubmitted(true);
    } catch {
      setError('Something went wrong sending your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = [
    'Your details',
    'Business',
    'Challenges',
    'Goals',
    'Project',
    'Budget',
  ];

  return (
    <section id="discovery" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(212,175,55,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Discovery"
          title={<>Let&apos;s build your <span className="text-gradient-gold">intelligent system</span></>}
          description="Tell us about your business and discover how automation can help you save time, reduce costs and scale."
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-400/[0.05] blur-[100px]" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessView key="success" name={form.fullName} onReset={reset} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Progress */}
                  <ProgressRail step={step} labels={stepLabels} />

                  {/* Step body */}
                  <div className="relative mt-10 min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        {step === 0 && <Step1 form={form} update={update} />}
                        {step === 1 && <Step2 form={form} update={update} />}
                        {step === 2 && <Step3 form={form} toggle={toggleProcess} />}
                        {step === 3 && <Step4 form={form} update={update} />}
                        {step === 4 && <Step5 form={form} update={update} />}
                        {step === 5 && <Step6 form={form} update={update} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-rose-300/90"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Controls */}
                  <div className="mt-10 flex items-center justify-between gap-4">
                    <button
                      onClick={back}
                      disabled={step === 0 || submitting}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-5 py-3 text-sm font-500 text-white/70 transition-all hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        onClick={next}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-200 to-gold-400 px-6 py-3 text-sm font-600 text-black transition-transform hover:scale-[1.03] gold-glow"
                      >
                        Continue
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <button
                        onClick={submit}
                        disabled={submitting}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-200 to-gold-400 px-6 py-3 text-sm font-600 text-black transition-transform hover:scale-[1.03] disabled:opacity-70 gold-glow"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Request Automation Strategy
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );

  function reset() {
    setForm(initialState);
    setStep(0);
    setSubmitted(false);
    setError(null);
  }
}

/* ---------- Progress rail ---------- */

function ProgressRail({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="flex items-center justify-between gap-1">
      {labels.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              <div
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                  i === 0 ? 'bg-transparent' : done || active ? 'bg-gold-400/50' : 'bg-white/8'
                }`}
              />
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-600 transition-all duration-500 ${
                  done
                    ? 'border-gold-400 bg-gold-400 text-black'
                    : active
                    ? 'border-gold-400 bg-gold-400/10 text-gold-200 gold-glow'
                    : 'border-white/12 bg-white/[0.02] text-white/40'
                }`}
              >
                {done ? <Check size={13} /> : i + 1}
              </div>
              <div
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                  i === labels.length - 1 ? 'bg-transparent' : done ? 'bg-gold-400/50' : 'bg-white/8'
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-500 uppercase tracking-[0.12em] transition-colors duration-300 ${
                active ? 'text-gold-200' : done ? 'text-white/55' : 'text-white/30'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Shared option chip ---------- */

function OptionChip({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Target;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-500 transition-all duration-300 ${
        active
          ? 'border-gold-400/50 bg-gold-400/10 text-white gold-glow'
          : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/25 hover:bg-white/[0.04] hover:text-white'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
          active ? 'border-gold-400/40 bg-gold-400/15 text-gold-200' : 'border-white/10 bg-white/[0.02] text-white/50'
        }`}
      >
        <Icon size={16} />
      </span>
      <span className="flex-1">{label}</span>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
          active ? 'border-gold-400 bg-gold-400 text-black' : 'border-white/15 opacity-0 group-hover:opacity-40'
        }`}
      >
        {active && <Check size={12} />}
      </span>
    </button>
  );
}

/* ---------- Field ---------- */

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-500 uppercase tracking-[0.14em] text-white/45">
        <Icon size={13} className="text-gold-300" />
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-gold-400/40 focus:bg-white/[0.04] focus:gold-glow';

/* ---------- Steps ---------- */

function Step1({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <StepIntro title="Contact information" sub="So we know who we're building this for." />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" icon={User}>
          <input
            className={inputCls}
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Alex Morgan"
          />
        </Field>
        <Field label="Company name" icon={Building2}>
          <input
            className={inputCls}
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Acme Inc."
          />
        </Field>
        <Field label="Email" icon={Mail}>
          <input
            type="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="alex@acme.com"
          />
        </Field>
        <Field label="Website (optional)" icon={Globe}>
          <input
            className={inputCls}
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="acme.com"
          />
        </Field>
      </div>
    </div>
  );
}

function Step2({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepIntro title="Business information" sub="What type of business do you have?" />
      <div className="grid gap-3 sm:grid-cols-2">
        {businessTypes.map((b) => (
          <OptionChip
            key={b.value}
            active={form.businessType === b.value}
            onClick={() => update('businessType', b.value)}
            icon={b.icon}
            label={b.value}
          />
        ))}
      </div>
    </div>
  );
}

function Step3({
  form,
  toggle,
}: {
  form: FormState;
  toggle: (p: AutomateProcess) => void;
}) {
  return (
    <div>
      <StepIntro title="Automation needs" sub="What processes would you like to automate? Select all that apply." />
      <div className="grid gap-3 sm:grid-cols-2">
        {processOptions.map((p) => (
          <OptionChip
            key={p.value}
            active={form.processes.includes(p.value)}
            onClick={() => toggle(p.value)}
            icon={p.icon}
            label={p.value}
          />
        ))}
      </div>
    </div>
  );
}

function Step4({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepIntro title="Main goal" sub="What is your primary goal?" />
      <div className="grid gap-3 sm:grid-cols-2">
        {goalOptions.map((g) => (
          <OptionChip
            key={g.value}
            active={form.goal === g.value}
            onClick={() => update('goal', g.value)}
            icon={g.icon}
            label={g.value}
          />
        ))}
      </div>
    </div>
  );
}

function Step5({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div>
      <StepIntro title="Project details" sub="Describe your current process and what you would like Velionix to build." />
      <textarea
        className={`${inputCls} min-h-[160px] resize-y leading-[1.6]`}
        value={form.projectDetails}
        onChange={(e) => update('projectDetails', e.target.value)}
        placeholder="We currently find leads manually by searching maps and directories, then copy them into a spreadsheet. We'd like Velionix to build a system that discovers businesses automatically, qualifies them with AI, and sends personalized outreach…"
      />
      <div className="mt-2 text-right text-xs text-white/30">
        {form.projectDetails.trim().length} characters
      </div>
    </div>
  );
}

function Step6({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-7">
      <StepIntro title="Budget and timeline" sub="A rough idea helps us scope the right system for you." />

      <div>
        <span className="mb-3 flex items-center gap-2 text-xs font-500 uppercase tracking-[0.14em] text-white/45">
          <Wallet size={13} className="text-gold-300" />
          Budget
        </span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {budgetOptions.map((b) => (
            <OptionChip
              key={b}
              active={form.budget === b}
              onClick={() => update('budget', b)}
              icon={Wallet}
              label={b}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="mb-3 flex items-center gap-2 text-xs font-500 uppercase tracking-[0.14em] text-white/45">
          <Calendar size={13} className="text-gold-300" />
          Timeline
        </span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {timelineOptions.map((t) => (
            <OptionChip
              key={t.value}
              active={form.timeline === t.value}
              onClick={() => update('timeline', t.value)}
              icon={t.icon}
              label={t.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepIntro({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-2xl font-600 tracking-tight text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-white/50">{sub}</p>
    </div>
  );
}

/* ---------- Success ---------- */

function SuccessView({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      className="flex flex-col items-center py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative flex h-24 w-24 items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full bg-gold-400/20 blur-2xl" />
        <span className="absolute inset-0 rounded-full border border-gold-400/40 animate-pulse-soft" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-gold-200 to-gold-400 text-black gold-glow-strong"
        >
          <Check size={40} strokeWidth={3} />
        </motion.span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        className="mt-8 font-display text-3xl font-600 tracking-tight text-white"
      >
        Request received
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
        className="mt-3 max-w-md text-sm leading-[1.6] text-white/55"
      >
        Thank you{name ? `, ${name.split(' ')[0]}` : ''}. Our team will analyze your responses and
        reach out within one business day with a tailored automation strategy.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.6 }}
        className="mt-8 flex items-center gap-2 rounded-full bg-glass px-4 py-2 text-xs text-white/50"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        Your strategy is being prepared
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={onReset}
        className="mt-8 text-sm font-500 text-gold-300 transition-colors hover:text-gold-200"
      >
        Submit another request
      </motion.button>
    </motion.div>
  );
}
