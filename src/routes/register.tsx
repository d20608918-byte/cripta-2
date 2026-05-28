import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, Mail, Lock, User, Hexagon, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({ meta: [{ title: "Тіркелу — NexWallet" }] }),
});

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Барлық өрістерді толтырыңыз");
      return;
    }
    if (password.length < 6) {
      setError("Құпия сөз кемінде 6 таңбадан тұруы керек");
      return;
    }
    if (password !== confirm) {
      setError("Құпия сөздер сәйкес келмейді");
      return;
    }

    setLoading(true);
    register(name, email, password).then((result) => {
      if (result.success) {
        navigate({ to: "/" });
      } else {
        setError(result.error || "Тіркелу қатесі");
      }
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background orbs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--neon-cyan)] opacity-15 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--neon-purple)] opacity-10 blur-[120px]" />

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
            <h1 className="text-2xl font-bold mb-2">Жаңа аккаунт</h1>
            <p className="text-sm text-muted-foreground">NexWallet-ке тіркеліңіз</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-[rgba(255,51,102,0.1)] border border-[var(--loss)] text-[var(--loss)] text-sm text-center">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Аты-жөні</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Нұрлан"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_16px_rgba(0,240,255,0.15)] transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="register-email"
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
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Кемінде 6 таңба"
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

            {/* Confirm */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Құпия сөзді қайталаңыз</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="register-confirm"
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_16px_rgba(0,240,255,0.15)] transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-neon w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Тіркелу
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Аккаунтыңыз бар ма?{" "}
            <Link to="/login" className="text-[var(--neon-cyan)] hover:underline font-medium">
              Кіру
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 opacity-50">
          © 2026 NexWallet. All rights reserved.
        </p>
      </div>
    </div>
  );
}
