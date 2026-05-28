import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export function ProfileDropdown() {
  const { user } = useAuth();
  
  const initials = user
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <Link
      to="/profile"
      id="profile-avatar"
      className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-[0_0_16px_rgba(112,0,255,0.5)] cursor-pointer transition-all hover:shadow-[0_0_24px_rgba(0,240,255,0.5)] hover:scale-105 flex-shrink-0"
    >
      <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center text-sm font-bold">
        {initials}
      </div>
    </Link>
  );
}
