import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { assets, type Asset } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — NexWallet" }] }),
});

function AssetCard({ asset }: { asset: Asset }) {
  const { format } = useCurrency();
  const up = asset.change >= 0;
  const data = asset.trend.map((v, i) => ({ i, v }));
  const stroke = up ? "#00ff88" : "#ff3366";
  const gradId = `g-${asset.symbol}`;
  return (
    <div className="glass glass-hover p-5 pb-16 flex flex-col gap-4 relative overflow-hidden group cursor-pointer">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: `${asset.color}20`, color: asset.color, boxShadow: `0 0 16px ${asset.color}40` }}
          >
            <img 
              src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${asset.symbol.toLowerCase()}.svg`} 
              alt={asset.symbol} 
              className="w-6 h-6 drop-shadow-sm"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = asset.symbol.slice(0, 2); }}
            />
          </div>
          <div>
            <p className="font-semibold">{asset.name}</p>
            <p className="text-xs text-muted-foreground">{asset.symbol}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm transition-colors duration-300 ${
            up ? "text-[var(--profit)] bg-[rgba(0,255,136,0.1)] group-hover:bg-[rgba(0,255,136,0.15)]" : "text-[var(--loss)] bg-[rgba(255,51,102,0.1)] group-hover:bg-[rgba(255,51,102,0.15)]"
          }`}
        >
          {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {up ? "+" : ""}{asset.change}%
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1">{format(asset.price)}</p>
        <p className="text-xs text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">{asset.amount} {asset.symbol}</p>
      </div>
      <div className="h-20 absolute bottom-0 left-0 right-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Area type="monotone" dataKey="v" stroke={stroke} strokeWidth={2} fill={`url(#${gradId})`} isAnimationActive={true} animationDuration={1200} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Dashboard() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const totalUsd = 124563.89;
  return (
    <div className="space-y-6">
      {/* Balance card */}
      <section className="glass p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[var(--neon-purple)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[var(--neon-cyan)] opacity-10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">{t('dashboard.total_balance')}</p>
            <div className="flex items-baseline gap-3 mt-2">
              <h1 className="text-5xl md:text-6xl font-bold text-gradient">{format(totalUsd)}</h1>
              <span className="text-sm font-semibold text-[var(--profit)] bg-[rgba(0,255,136,0.12)] px-2.5 py-1 rounded-full">
                +5.2%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">≈ 1.846 BTC · {t('dashboard.last_24h')}</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-neon px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" /> {t('dashboard.send')}
            </button>
            <button className="btn-ghost-neon px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <ArrowDownLeft className="w-4 h-4" /> {t('dashboard.receive')}
            </button>
          </div>
        </div>
      </section>

      {/* Assets */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{t('dashboard.your_assets')}</h2>
          <button className="text-xs text-[var(--neon-cyan)] hover:underline">{t('dashboard.view_all')}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {assets.map((a) => <AssetCard key={a.symbol} asset={a} />)}
        </div>
      </section>
    </div>
  );
}
