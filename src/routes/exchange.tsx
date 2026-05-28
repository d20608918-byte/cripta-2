import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import { assets } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/exchange")({
  component: Exchange,
  head: () => ({ meta: [{ title: "Exchange — NexWallet" }] }),
});

function CoinSelect({ symbol }: { symbol: string }) {
  const a = assets.find((x) => x.symbol === symbol)!;
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[var(--neon-cyan)] transition-colors">
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{ background: `${a.color}25`, color: a.color }}
      >
        <img 
          src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${a.symbol.toLowerCase()}.svg`} 
          alt={a.symbol} 
          className="w-4 h-4 drop-shadow-sm"
          onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = a.symbol; }}
        />
      </span>
      <span className="font-semibold text-sm">{a.symbol}</span>
      <ChevronDown className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function Exchange() {
  const { t } = useLanguage();
  const [from, setFrom] = useState("1.0");
  const [to, setTo] = useState("19.15");

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('exchange.title')}</h1>
      <div className="glass p-6 relative">
        <div className="space-y-2">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{t('exchange.from')}</span><span>{t('exchange.balance')} 1.245 BTC</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="flex-1 bg-transparent text-3xl font-bold outline-none min-w-0"
              />
              <CoinSelect symbol="BTC" />
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
            <button className="swap-arrow w-11 h-11 rounded-full btn-neon flex items-center justify-center">
              <ArrowDownUp className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{t('exchange.to')}</span><span>{t('exchange.balance')} 12.78 ETH</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="flex-1 bg-transparent text-3xl font-bold outline-none min-w-0"
              />
              <CoinSelect symbol="ETH" />
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>{t('exchange.rate')}</span><span className="text-white">1 BTC ≈ 19.15 ETH</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>{t('exchange.network_fee')}</span><span className="text-white">$2.45</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>{t('exchange.slippage')}</span><span className="text-[var(--neon-cyan)]">0.5%</span>
          </div>
        </div>

        <button className="btn-neon mt-6 w-full py-4 rounded-2xl font-bold text-lg">{t('exchange.swap')}</button>
      </div>
    </div>
  );
}
