import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Mail, Lock, Hexagon, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Кіру — NexWallet" }] }),
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Барлық өрістерді толтырыңыз");
      return;
    }

    setLoading(true);
    login(email, password).then((result) => {
      if (result.success) {
        navigate({ to: "/" });
      } else {
        setError(result.error || "Кіру қатесі");
      }
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--neon-purple)] opacity-15 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--neon-cyan)] opacity-10 blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-[var(--neon-cyan)] opacity-60" />
            <Hexagon className="relative w-10 h-10 text-[var(--neon-cyan)]" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-bold text-gradient tracking-wide">NexWallet</span>
        </div>

        {/* Card */}
        <div className="glass p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Қош келдіңіз!</h1>
            <p className="text-sm text-muted-foreground">Аккаунтыңызға кіріңіз</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-[rgba(255,51,102,0.1)] border border-[var(--loss)] text-[var(--loss)] text-sm text-center animate-in fade-in">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_16px_rgba(0,240,255,0.15)] transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Құпия сөз</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_16px_rgba(0,240,255,0.15)] transition-all placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-neon w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Кіру
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Аккаунтыңыз жоқ па?{" "}
            <Link to="/register" className="text-[var(--neon-cyan)] hover:underline font-medium">
              Тіркелу
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6 opacity-50">
          © 2026 NexWallet. All rights reserved.
        </p>
      </div>
    </div>
  );
}
