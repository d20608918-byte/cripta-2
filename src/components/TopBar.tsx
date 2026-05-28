import { Search, Sun, Moon } from "lucide-react";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { NotificationPanel } from "./NotificationPanel";
import { ProfileDropdown } from "./ProfileDropdown";
import { useTheme } from "@/lib/theme";

export function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass mb-6 p-3 sm:p-4 flex flex-col-reverse sm:flex-row items-center gap-3 sm:gap-4 sticky top-0 md:top-4 overflow-visible w-full" style={{ zIndex: 50 }}>
      <div className="relative w-full flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-[var(--neon-cyan)] transition-colors" />
        <input
          type="text"
          placeholder="Search currencies..."
          className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground outline-none transition-all focus:border-[var(--neon-cyan)] focus:shadow-[0_0_18px_rgba(0,240,255,0.25)]"
        />
      </div>
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end ml-auto">
        <CurrencySwitcher />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative w-[60px] h-8 rounded-full bg-white/5 border border-white/10 flex items-center transition-all hover:border-[var(--neon-cyan)]/50"
          title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        >
          <div className="absolute inset-0 flex items-center justify-between px-2 w-full pointer-events-none">
            <Moon className="w-4 h-4 text-[var(--neon-purple)] opacity-40" />
            <Sun className="w-4 h-4 text-yellow-400 opacity-40" />
          </div>
          <div
            className={`absolute top-1 w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 ${
              theme === "dark" ? "left-1" : "left-[30px]"
            }`}
          >
            {theme === "dark" ? (
              <Moon className="w-3.5 h-3.5 text-[var(--neon-purple)] drop-shadow-[0_0_5px_rgba(180,0,255,0.5)]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
            )}
          </div>
        </button>

        {/* Notifications */}
        <NotificationPanel />

        {/* Profile */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
