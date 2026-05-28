import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { transactions } from "@/lib/mock-data";
import { useCurrency } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/history")({
  component: History,
  head: () => ({ meta: [{ title: "History — NexWallet" }] }),
});

const iconMap = {
  received: { Icon: ArrowDownLeft, color: "#00ff88", labelKey: "history.received" },
  sent: { Icon: ArrowUpRight, color: "#ff3366", labelKey: "history.sent" },
  swap: { Icon: ArrowLeftRight, color: "#00f0ff", labelKey: "history.swapped" },
} as const;

function History() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('history.title')}</h1>
      <div className="space-y-3">
        {transactions.map((t_item) => {
          const { Icon, color, labelKey } = iconMap[t_item.type];
          const sign = t_item.type === "sent" ? "-" : t_item.type === "received" ? "+" : "";
          return (
            <div key={t_item.id} className="glass glass-hover p-4 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20`, color, boxShadow: `0 0 16px ${color}30` }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{t(labelKey)} {t_item.asset}</p>
                <p className="text-xs text-muted-foreground">{t_item.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold" style={{ color: t_item.type === "sent" ? "var(--loss)" : t_item.type === "received" ? "var(--profit)" : "var(--foreground)" }}>
                  {sign}{t_item.amount} {t_item.asset.split(" ")[0]}
                </p>
                <p className="text-xs text-muted-foreground">{format(t_item.usd)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
