import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES, useCurrency, type CurrencyCode } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings — NexWallet" }] }),
});

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-12 h-6 rounded-full transition-all ${
        on ? "bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.4)]" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${on ? "translate-x-6" : ""}`}
      />
    </button>
  );
}

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode, className?: string }) {
  return (
    <div className={`glass p-6 ${className}`}>
      <h2 className="font-bold mb-2 text-lg text-gradient">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Select({ value: initial, options }: { value: string; options?: string[] }) {
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => options && setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:border-[var(--neon-cyan)] transition-colors"
      >
        {value} <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
      {open && options && (
        <div className="absolute right-0 mt-2 w-40 glass p-1.5 z-50">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setValue(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/5 ${value === opt ? "text-[var(--neon-cyan)]" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CurrencyPicker() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:border-[var(--neon-cyan)] transition-colors"
      >
        <span className="text-[var(--neon-cyan)]">{CURRENCIES[currency].symbol}</span>
        {currency} <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 glass p-1.5 z-50">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCurrency(c); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 ${currency === c ? "text-[var(--neon-cyan)]" : ""}`}
            >
              <span className="w-5 text-center">{CURRENCIES[c].symbol}</span>
              <span className="font-semibold">{c}</span>
              <span className="text-xs text-muted-foreground flex-1 text-left">{CURRENCIES[c].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Settings() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold">{t('settings.title')}</h1>

      <Section title={t('settings.account')} className="relative z-30">
        <Row title={t('settings.display_name')} desc={t('settings.display_name_desc')}><Select value="@nexuser" /></Row>
        <Row title={t('settings.email')} desc={t('settings.email_desc')}><Select value="ax@nex.app" /></Row>
      </Section>

      <Section title={t('settings.security')} className="relative z-20">
        <Row title={t('settings.2fa')} desc={t('settings.2fa_desc')}><Toggle defaultOn /></Row>
        <Row title={t('settings.biometric')} desc={t('settings.biometric_desc')}><Toggle defaultOn /></Row>
        <Row title={t('settings.autolock')} desc={t('settings.autolock_desc')}>
          <Select value={t('settings.opt.5min')} options={[t('settings.opt.1min'), t('settings.opt.5min'), t('settings.opt.15min'), t('settings.opt.30min'), t('settings.opt.1hour'), t('settings.opt.never')]} />
        </Row>
      </Section>

      <Section title={t('settings.preferences')} className="relative z-10">
        <Row title={t('settings.currency')} desc={t('settings.currency_desc')}><CurrencyPicker /></Row>
        <Row title={t('settings.network')} desc={t('settings.network_desc')}>
          <Select value={t('settings.opt.mainnet')} options={[t('settings.opt.mainnet'), t('settings.opt.testnet'), t('settings.opt.devnet')]} />
        </Row>
        <Row title={t('settings.push')} desc={t('settings.push_desc')}><Toggle defaultOn /></Row>
        <Row title={t('settings.reduced_motion')} desc={t('settings.reduced_motion_desc')}><Toggle /></Row>
      </Section>
    </div>
  );
}
