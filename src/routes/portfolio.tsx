import { createFileRoute } from "@tanstack/react-router";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { assets } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({ meta: [{ title: "Portfolio — NexWallet" }] }),
});

type Recommendation = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  color: string;
  rating: number; // 1-5
  risk: "Төмен" | "Орташа" | "Жоғары";
  riskEn: "Low" | "Medium" | "High";
  reason: string;
  tag: string;
};

const recommendations: Recommendation[] = [
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: 38.72,
    change24h: 8.45,
    color: "#e84142",
    rating: 5,
    risk: "Орташа",
    riskEn: "Medium",
    reason: "Жылдам өсу трендінде, DeFi экожүйесі кеңеюде",
    tag: "🔥 Трендте",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: 18.93,
    change24h: 4.22,
    color: "#2a5ada",
    rating: 4,
    risk: "Төмен",
    riskEn: "Low",
    reason: "Oracle нарығының көшбасшысы, тұрақты өсім",
    tag: "🛡️ Қауіпсіз",
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    price: 7.85,
    change24h: -1.33,
    color: "#e6007a",
    rating: 3,
    risk: "Орташа",
    riskEn: "Medium",
    reason: "Паракейн экожүйесі дамуда, ұзақ мерзімге жарайды",
    tag: "📈 Ұзақ мерзім",
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    price: 0.89,
    change24h: 6.12,
    color: "#8247e5",
    rating: 4,
    risk: "Төмен",
    riskEn: "Low",
    reason: "L2 шешімдер арасында алдыңғы қатарда, zkEVM жетістіктері",
    tag: "⚡ Layer 2",
  },
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    price: 7.42,
    change24h: 12.8,
    color: "#00c08b",
    rating: 5,
    risk: "Жоғары",
    riskEn: "High",
    reason: "AI интеграциясы мен жылдам дамушы экожүйе",
    tag: "🤖 AI + Crypto",
  },
];

function RiskBadge({ risk }: { risk: string }) {
  const color =
    risk === "Төмен"
      ? "text-[var(--profit)] bg-[rgba(0,255,136,0.1)]"
      : risk === "Жоғары"
        ? "text-[var(--loss)] bg-[rgba(255,51,102,0.1)]"
        : "text-yellow-400 bg-yellow-400/10";
  const Icon = risk === "Жоғары" ? AlertTriangle : ShieldCheck;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
      <Icon className="w-3 h-3" />
      {risk}
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-white/15"}`}
        />
      ))}
    </div>
  );
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const up = rec.change24h >= 0;
  return (
    <div className="glass glass-hover p-5 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110"
            style={{
              background: `${rec.color}20`,
              color: rec.color,
              boxShadow: `0 0 16px ${rec.color}30`,
            }}
          >
            <img 
              src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${rec.symbol.toLowerCase()}.svg`} 
              alt={rec.symbol} 
              className="w-6 h-6 drop-shadow-sm"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = rec.symbol.slice(0, 2); }}
            />
          </div>
          <div>
            <p className="font-semibold">{rec.name}</p>
            <p className="text-xs text-muted-foreground">{rec.symbol}</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10">
          {rec.tag}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-xl font-bold">{format(rec.price)}</p>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            up
              ? "text-[var(--profit)] bg-[rgba(0,255,136,0.1)]"
              : "text-[var(--loss)] bg-[rgba(255,51,102,0.1)]"
          }`}
        >
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {up ? "+" : ""}
          {rec.change24h}%
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{rec.reason}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Stars count={rec.rating} />
          <RiskBadge risk={rec.risk} />
        </div>
        <button className="text-[var(--neon-cyan)] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {t('common.buy')} <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function Portfolio() {
  const { format } = useCurrency();
  const { t, language } = useLanguage();
  const values = assets.map((a) => ({ ...a, value: a.price * a.amount }));
  const total = values.reduce((s, a) => s + a.value, 0);
  const data = values.map((a) => ({ name: a.symbol, value: a.value, color: a.color }));

  // Portfolio stats
  const bestPerformer = [...assets].sort((a, b) => b.change - a.change)[0];
  const worstPerformer = [...assets].sort((a, b) => a.change - b.change)[0];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('portfolio.title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-8 relative">
          <h2 className="font-semibold mb-4">{t('portfolio.allocation')}</h2>
          <div className="relative h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {data.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{t('portfolio.total')}</p>
              <p className="text-3xl font-bold text-gradient">
                {format(total)}
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-8">
          <h2 className="font-semibold mb-4">{t('portfolio.holdings')}</h2>
          <ul className="space-y-3">
            {values.map((a) => {
              const pct = (a.value / total) * 100;
              return (
                <li key={a.symbol} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${a.color}25`, color: a.color }}
                  >
                    <img 
                      src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${a.symbol.toLowerCase()}.svg`} 
                      alt={a.symbol} 
                      className="w-5 h-5 drop-shadow-sm"
                      onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = a.symbol.slice(0, 2); }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.amount} {a.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{format(a.value)}</p>
                    <p className="text-xs text-[var(--neon-cyan)]">{pct.toFixed(1)}%</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Portfolio Performance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[var(--profit)]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t('portfolio.best_asset')}</p>
            <p className="font-semibold">{bestPerformer.name}</p>
            <p className="text-xs text-[var(--profit)]">+{bestPerformer.change}%</p>
          </div>
        </div>
        <div className="glass p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(255,51,102,0.1)] flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-[var(--loss)]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t('portfolio.worst_asset')}</p>
            <p className="font-semibold">{worstPerformer.name}</p>
            <p className="text-xs text-[var(--loss)]">{worstPerformer.change}%</p>
          </div>
        </div>
        <div className="glass p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(0,240,255,0.1)] flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[var(--neon-cyan)]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t('portfolio.asset_count')}</p>
            <p className="font-semibold">{assets.length} {t('portfolio.coins')}</p>
            <p className="text-xs text-[var(--neon-cyan)]">{t('portfolio.diversification')}</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center shadow-[0_0_16px_rgba(112,0,255,0.3)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('portfolio.ai_recommendations')}</h2>
              <p className="text-xs text-muted-foreground">{t('portfolio.ai_desc')}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
            {t('portfolio.updated_today')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.symbol} rec={rec} />
          ))}
        </div>

        <div className="mt-4 glass p-4 flex items-start gap-3 text-xs text-muted-foreground">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-yellow-400">{t('portfolio.warning')}</span> {t('portfolio.warning_desc')}
          </p>
        </div>
      </section>
    </div>
  );
}
