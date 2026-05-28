import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { CURRENCIES, useCurrency, type CurrencyCode } from "@/lib/currency";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 h-10 rounded-full bg-white/5 border border-white/10 text-sm font-semibold hover:border-[var(--neon-cyan)] transition-colors"
      >
        <span className="text-[var(--neon-cyan)]">{CURRENCIES[currency].symbol}</span>
        {currency}
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 glass p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCurrency(c); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors ${
                currency === c ? "text-[var(--neon-cyan)]" : ""
              }`}
            >
              <span className="w-5 text-center">{CURRENCIES[c].symbol}</span>
              <span className="font-semibold">{c}</span>
              <span className="text-xs text-muted-foreground flex-1 text-left">{CURRENCIES[c].label}</span>
              {currency === c && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
