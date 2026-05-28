import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "KZT" | "RUB" | "BTC";

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: "$", rate: 1, label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, label: "Euro" },
  KZT: { symbol: "₸", rate: 470, label: "Kazakh Tenge" },
  RUB: { symbol: "₽", rate: 92, label: "Russian Ruble" },
  BTC: { symbol: "₿", rate: 1 / 104850.63, label: "Bitcoin" },
};

type Ctx = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (usd: number) => string;
  symbol: string;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("nex-currency") as CurrencyCode | null;
    if (saved && saved in CURRENCIES) setCurrencyState(saved);
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem("nex-currency", c); } catch {}
  };

  const info = CURRENCIES[currency];
  const format = (usd: number) => {
    const v = usd * info.rate;
    const digits = currency === "BTC" ? 6 : currency === "KZT" || currency === "RUB" ? 0 : 2;
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
    return currency === "KZT" || currency === "RUB"
      ? `${formatted} ${info.symbol}`
      : `${info.symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, symbol: info.symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
