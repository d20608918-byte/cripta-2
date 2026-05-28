import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/locales";
import {
  Copy,
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Shield,
  Settings,
  LogOut,
  Smartphone,
  Laptop,
  Pencil,
  X
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Профиль — NexWallet" }] }),
});

function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const walletAddress = "0x8f3d...c2a1b7e4";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x8f3d4a2bc2a1b7e49f23d87e1c");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  const startEdit = () => {
    setEditName(user?.name || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editName.trim()) return;
    setIsSaving(true);
    await updateProfile(editName);
    setIsSaving(false);
    setIsEditing(false);
  };

  const initials = user
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Banner & Profile Header */}
      <div className="glass overflow-hidden">
        <div className="h-40 sm:h-48 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] opacity-90 relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -bottom-12 left-6 sm:left-10">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-[var(--background)] shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#020204] flex items-center justify-center text-4xl font-bold text-white border-2 border-white/10">
                {initials}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-2xl font-bold text-white outline-none focus:border-[var(--neon-cyan)] w-full max-w-[250px]"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="p-2 rounded-lg bg-[var(--profit)]/20 text-[var(--profit)] hover:bg-[var(--profit)]/30 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? <div className="w-5 h-5 border-2 border-[var(--profit)]/30 border-t-[var(--profit)] rounded-full animate-spin" /> : <Check className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-white transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
                  <button
                    onClick={startEdit}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                    title="Атын өзгерту"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-muted-foreground mt-1">{user?.email || "user@nex.app"}</p>
              
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[var(--profit)] shadow-[0_0_8px_var(--profit)]" />
                <span className="text-sm font-mono text-muted-foreground">{walletAddress}</span>
                <button
                  onClick={handleCopyAddress}
                  className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  title="Адресті көшіру"
                >
                  {copied ? <Check className="w-4 h-4 text-[var(--profit)]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="sm:text-right bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Жалпы Баланс
              </p>
              <p className="text-3xl font-bold text-gradient">$24,583.47</p>
              <p className="text-sm text-[var(--profit)] mt-1 flex items-center sm:justify-end gap-1">
                ↑ +$1,247.20 (5.3%) <span className="text-muted-foreground ml-1">24с</span>
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="py-4 rounded-xl bg-gradient-to-r from-[rgba(0,255,136,0.1)] to-transparent text-[var(--profit)] font-semibold border border-[rgba(0,255,136,0.2)] hover:border-[rgba(0,255,136,0.4)] flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,255,136,0.15)]">
              <ArrowDownLeft className="w-5 h-5" /> Алу
            </button>
            <button className="py-4 rounded-xl bg-gradient-to-r from-[rgba(255,51,102,0.1)] to-transparent text-[var(--loss)] font-semibold border border-[rgba(255,51,102,0.2)] hover:border-[rgba(255,51,102,0.4)] flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,51,102,0.15)]">
              <ArrowUpRight className="w-5 h-5" /> Жіберу
            </button>
            <button className="py-4 rounded-xl bg-gradient-to-r from-[rgba(0,240,255,0.1)] to-transparent text-[var(--neon-cyan)] font-semibold border border-[rgba(0,240,255,0.2)] hover:border-[rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,240,255,0.15)]">
              <Wallet className="w-5 h-5" /> Толтыру
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings & Preferences */}
        <div className="glass p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[var(--neon-cyan)]" /> Баптаулар
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Тіл / Language</p>
              <div className="flex gap-2">
                {(['kz', 'en', 'es'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold uppercase transition-all ${
                      language === lang
                        ? 'bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30'
                        : 'bg-white/5 text-muted-foreground hover:text-white border border-transparent hover:border-white/10'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 text-[var(--loss)] bg-[rgba(255,51,102,0.05)] border border-[rgba(255,51,102,0.1)] hover:bg-[rgba(255,51,102,0.1)] transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" /> Аккаунттан шығу
            </button>
          </div>
        </div>

        {/* Security & Devices */}
        <div className="glass p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--neon-purple)]" /> Қауіпсіздік
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Windows Chrome</p>
                  <p className="text-xs text-muted-foreground">Қазіргі құрылғы · Алматы</p>
                </div>
              </div>
              <span className="text-xs text-[var(--profit)] bg-[var(--profit)]/10 px-2 py-1 rounded-md">Активті</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">iPhone 14 Pro</p>
                  <p className="text-xs text-muted-foreground">Кеше 14:32 · Астана</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
