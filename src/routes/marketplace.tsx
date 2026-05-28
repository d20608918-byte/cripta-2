import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronDown,
  Zap,
  Shield,
  Clock,
  Search,
  Info
} from "lucide-react";
import { assets, type Asset } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n";
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
  head: () => ({ meta: [{ title: "Магазин — NexWallet" }] }),
});

type TradeMode = "buy" | "sell";

function CoinSelector({
  selected,
  onSelect,
}: {
  selected: Asset;
  onSelect: (a: Asset) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--neon-cyan)] transition-all w-full"
      >
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: `${selected.color}20`, color: selected.color, boxShadow: `0 0 12px ${selected.color}30` }}
        >
          <img 
            src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${selected.symbol.toLowerCase()}.svg`} 
            alt={selected.symbol} 
            className="w-5 h-5 drop-shadow-sm"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = selected.symbol; }}
          />
        </span>
        <div className="flex-1 text-left">
          <p className="font-semibold text-sm">{selected.name}</p>
          <p className="text-xs text-muted-foreground">{selected.symbol}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-2 glass p-2 z-50 space-y-1">
          {assets.map((a) => (
            <button
              key={a.symbol}
              onClick={() => { onSelect(a); setOpen(false); }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors ${
                a.symbol === selected.symbol ? "bg-white/5 text-[var(--neon-cyan)]" : ""
              }`}
            >
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{ background: `${a.color}20`, color: a.color }}
              >
                <img 
                  src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${a.symbol.toLowerCase()}.svg`} 
                  alt={a.symbol} 
                  className="w-4 h-4 drop-shadow-sm"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = a.symbol; }}
                />
              </span>
              <span className="font-medium">{a.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">{a.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PriceCard({ asset, isSelected }: { asset: Asset, isSelected?: boolean }) {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState("1D");
  const up = asset.change >= 0;
  const stroke = up ? "#00ff88" : "#ff3366";
  const gradId = `market-grad-${asset.symbol}`;
  const data = asset.trend.map((v, i) => ({ i, v }));

  return (
    <div className="glass glass-hover p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{ background: `${asset.color}20`, color: asset.color, boxShadow: `0 0 14px ${asset.color}30` }}
          >
            <img 
              src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${asset.symbol.toLowerCase()}.svg`} 
              alt={asset.symbol} 
              className="w-5 h-5 drop-shadow-sm"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = asset.symbol; }}
            />
          </span>
          <div>
            <p className="font-semibold">{asset.name}</p>
            <p className="text-xs text-muted-foreground">{asset.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          up ? "text-[var(--profit)] bg-[rgba(0,255,136,0.1)]" : "text-[var(--loss)] bg-[rgba(255,51,102,0.1)]"
        }`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {up ? "+" : ""}{asset.change}%
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{format(asset.price)}</p>
      </div>

      {/* Expanded Details ("Reviews" & Info) */}
      <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{t('market.balance') || "Balance"}</span>
          <span className="font-medium">{asset.amount} {asset.symbol}</span>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-semibold">
            <span className="text-[var(--profit)]">75% Buy (High Demand)</span>
            <span className="text-[var(--loss)]">25% Sell</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex">
            <div className="bg-[var(--profit)] h-full w-[75%]" />
            <div className="bg-[var(--loss)] h-full w-[25%]" />
          </div>
        </div>
      </div>

      <div 
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          isSelected ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="pt-4 border-t border-white/5">
            {/* Timeframe selector */}
            <div className="flex items-center gap-2 mb-4">
              {["1H", "1D", "1W", "1M", "1Y", "ALL"].map((tf) => (
                <button 
                  key={tf}
                  onClick={(e) => { e.stopPropagation(); setTimeframe(tf); }}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all ${timeframe === tf ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="i" hide />
                  <YAxis 
                    domain={['dataMin', 'dataMax']} 
                    orientation="right" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(val) => {
                      if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'k';
                      return '$' + val.toLocaleString();
                    }}
                    width={50}
                  />
                  <Tooltip 
                    cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass bg-[var(--popover)] border-[var(--border)] px-3 py-2 text-xs font-bold shadow-xl rounded-lg text-[var(--popover-foreground)]">
                            {format(payload[0].value as number)}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="v" 
                    stroke={stroke} 
                    strokeWidth={2} 
                    fill={`url(#${gradId})`}
                    activeDot={{ r: 5, fill: stroke, stroke: '#1a1a2e', strokeWidth: 2 }}
                    isAnimationActive={isSelected} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
    </div>
  );
}

function Marketplace() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const [mode, setMode] = useState<TradeMode>("buy");
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "gainers">("name");

  const numAmount = parseFloat(amount) || 0;
  const totalUsd = numAmount * selectedAsset.price;
  const fee = totalUsd * 0.015; // 1.5% fee

  const filteredAssets = assets
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "gainers") return b.change - a.change;
      return 0;
    });

  const handleTrade = () => {
    if (numAmount <= 0) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-[var(--neon-cyan)]" />
          {t('market.title')}
        </h1>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div className="glass border-[var(--profit)] border px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="w-10 h-10 rounded-full bg-[rgba(0,255,136,0.15)] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[var(--profit)]" />
          </div>
          <div>
            <p className="font-semibold text-[var(--profit)]">{t('market.success')}</p>
            <p className="text-sm text-muted-foreground">
              {numAmount} {selectedAsset.symbol} {mode === "buy" ? t('market.bought') : t('market.sold')}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
        {/* Trade Panel */}
        <div className="lg:col-span-5 space-y-5">
          {/* Mode tabs */}
          <div className="glass p-1.5 flex gap-1 max-w-xs">
            <button
              onClick={() => setMode("buy")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                mode === "buy"
                  ? "bg-gradient-to-r from-[rgba(0,255,136,0.2)] to-[rgba(0,240,255,0.1)] text-[var(--profit)] shadow-[0_0_16px_rgba(0,255,136,0.15)]"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <ArrowDownCircle className="w-4 h-4" />
              {t('common.buy')}
            </button>
            <button
              onClick={() => setMode("sell")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                mode === "sell"
                  ? "bg-gradient-to-r from-[rgba(255,51,102,0.2)] to-[rgba(112,0,255,0.1)] text-[var(--loss)] shadow-[0_0_16px_rgba(255,51,102,0.15)]"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <ArrowUpCircle className="w-4 h-4" />
              {t('common.sell')}
            </button>
          </div>

          {/* Trade form */}
          <div className="glass p-6 space-y-5">
            <h2 className="text-lg font-bold">
              {mode === "buy" ? t('market.buy_crypto') : t('market.sell_crypto')}
            </h2>

            {/* Asset selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">{t('market.select_crypto')}</label>
              <CoinSelector selected={selectedAsset} onSelect={setSelectedAsset} />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('market.amount')} ({selectedAsset.symbol})
              </label>
              <div className="relative">
                <input
                  id="trade-amount"
                  type="number"
                  step="any"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-2xl font-bold outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_16px_rgba(0,240,255,0.15)] transition-all placeholder:text-white/15"
                />
                {mode === "sell" && (
                  <button
                    onClick={() => setAmount(String(selectedAsset.amount))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--neon-cyan)] hover:underline font-medium px-3 py-1.5 rounded-lg bg-white/5"
                  >
                    MAX
                  </button>
                )}
              </div>
              {mode === "sell" && (
                <p className="text-xs text-muted-foreground">
                  {t('market.available')} {selectedAsset.amount} {selectedAsset.symbol}
                </p>
              )}
            </div>

            {/* Quick amounts */}
            {mode === "buy" && (
              <div className="flex gap-2">
                {[100, 500, 1000, 5000].map((usd) => (
                  <button
                    key={usd}
                    onClick={() => setAmount(String((usd / selectedAsset.price).toFixed(6)))}
                    className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all"
                  >
                    ${usd}
                  </button>
                ))}
              </div>
            )}

            {/* Summary */}
            {numAmount > 0 && (
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('market.price')}</span>
                  <span className="font-medium">{format(selectedAsset.price)} / {selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('market.amount')}</span>
                  <span className="font-medium">{numAmount} {selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('market.fee')} (1.5%)</span>
                  <span className="font-medium">{format(fee)}</span>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between">
                  <span className="font-semibold">{mode === "buy" ? t('market.total') : t('market.receive')}</span>
                  <span className="text-lg font-bold text-gradient">
                    {format(mode === "buy" ? totalUsd + fee : totalUsd - fee)}
                  </span>
                </div>
              </div>
            )}

            {/* Trade button */}
            <button
              id="trade-submit"
              onClick={handleTrade}
              disabled={numAmount <= 0}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                mode === "buy"
                  ? "bg-gradient-to-r from-[#00ff88] to-[#00f0ff] text-black shadow-[0_4px_20px_rgba(0,255,136,0.35)] hover:shadow-[0_8px_28px_rgba(0,255,136,0.5)] hover:-translate-y-0.5"
                  : "bg-gradient-to-r from-[#ff3366] to-[#7000ff] text-white shadow-[0_4px_20px_rgba(255,51,102,0.35)] hover:shadow-[0_8px_28px_rgba(255,51,102,0.5)] hover:-translate-y-0.5"
              }`}
            >
              {mode === "buy" ? (
                <>
                  <ArrowDownCircle className="w-5 h-5" /> {t('common.buy')}
                </>
              ) : (
                <>
                  <ArrowUpCircle className="w-5 h-5" /> {t('common.sell')}
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                {t('market.secure')}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                {t('market.instant')}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                {t('market.low_fee')}
              </div>
            </div>

            {/* Fees & Return Policy equivalent */}
            <div className="mt-4 p-4 rounded-xl bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.1)] text-xs text-muted-foreground leading-relaxed space-y-2">
              <p className="text-[var(--neon-cyan)] font-semibold flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Fees, Delivery & Returns</p>
              <p>• <strong>Delivery:</strong> Instant to your secure NexWallet.</p>
              <p>• <strong>Returns:</strong> Crypto transactions are irreversible. Ensure amounts are correct before submitting.</p>
              <p>• <strong>Fees:</strong> A flat network fee of 1.5% applies.</p>
            </div>
          </div>
        </div>

        {/* Prices sidebar */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold">{t('market.market_prices')}</h2>
          
          {/* Filters & Sorting */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-[var(--neon-cyan)] transition-colors"
              />
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-[var(--neon-cyan)] transition-colors appearance-none cursor-pointer"
            >
              <option value="name" className="bg-[#1a1a2e] text-white">A-Z</option>
              <option value="price" className="bg-[#1a1a2e] text-white">Price</option>
              <option value="gainers" className="bg-[#1a1a2e] text-white">Top Gainers</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((a) => (
              <button
                key={a.symbol}
                onClick={() => setSelectedAsset(a)}
                className={`w-full text-left transition-all ${
                  a.symbol === selectedAsset.symbol ? "ring-1 ring-[var(--neon-cyan)] rounded-[var(--radius)]" : ""
                }`}
              >
                <PriceCard asset={a} isSelected={a.symbol === selectedAsset.symbol} />
              </button>
            ))}
            {filteredAssets.length === 0 && (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                No assets found matching "{search}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
