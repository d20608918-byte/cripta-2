import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, PieChart, ArrowLeftRight, History, Settings, Hexagon, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";

const links = [
  { to: "/", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { to: "/portfolio", labelKey: "nav.portfolio", icon: PieChart },
  { to: "/exchange", labelKey: "nav.exchange", icon: ArrowLeftRight },
  { to: "/marketplace", labelKey: "nav.marketplace", icon: ShoppingCart },
  { to: "/history", labelKey: "nav.history", icon: History },
  { to: "/settings", labelKey: "nav.settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col p-6 z-20 glass rounded-none border-r border-t-0 border-l-0 border-b-0">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-[var(--neon-cyan)] opacity-60" />
            <Hexagon className="relative w-8 h-8 text-[var(--neon-cyan)]" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-bold text-gradient tracking-wide">NexWallet</span>
        </Link>
        <nav className="flex flex-col gap-2">
          {links.map((l) => {
            const active = pathname === l.to;
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "text-white bg-gradient-to-r from-[rgba(112,0,255,0.25)] to-[rgba(0,240,255,0.1)] shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]" />
                )}
                <Icon className="w-5 h-5" />
                {t(l.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* User info + Logout */}
        <div className="mt-auto space-y-3">
          {user && (
            <div className="glass p-4 text-xs">
              <p className="text-white font-semibold truncate">{user.name}</p>
              <p className="text-muted-foreground truncate mt-0.5">{user.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-[var(--loss)] hover:bg-[rgba(255,51,102,0.08)] transition-all"
          >
            <LogOut className="w-5 h-5" />
            {t('profile.logout')}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass rounded-none border-t border-l-0 border-r-0 border-b-0 flex justify-around p-2">
        {links.map((l) => {
          const active = pathname === l.to;
          const Icon = l.icon;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
                active ? "text-[var(--neon-cyan)]" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{t(l.labelKey)}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

