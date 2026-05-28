import { useState, useRef, useEffect } from "react";
import {
  Bell,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  TrendingUp,
  CheckCheck,
  Trash2,
  X,
} from "lucide-react";

type Notification = {
  id: string;
  type: "receive" | "send" | "security" | "price";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "receive",
    title: "Кіріс транзакция",
    message: "+0.45 ETH алынды (0x8f3d...c2a1)",
    time: "2 мин бұрын",
    read: false,
  },
  {
    id: "2",
    type: "price",
    title: "Баға ескертуі",
    message: "BTC $72,000 деңгейінен асты! 🚀",
    time: "15 мин бұрын",
    read: false,
  },
  {
    id: "3",
    type: "security",
    title: "Жаңа кіру анықталды",
    message: "Chrome · Windows · Алматы, KZ",
    time: "1 сағат бұрын",
    read: false,
  },
  {
    id: "4",
    type: "send",
    title: "Шығыс транзакция",
    message: "-120 USDT жіберілді (0x4a2b...e9f3)",
    time: "3 сағат бұрын",
    read: true,
  },
  {
    id: "5",
    type: "price",
    title: "Портфолио жаңартуы",
    message: "Портфолиоңыз 24с +5.2% өсті",
    time: "6 сағат бұрын",
    read: true,
  },
];

const typeConfig = {
  receive: {
    icon: ArrowDownLeft,
    color: "var(--profit)",
    bg: "rgba(0, 255, 136, 0.1)",
  },
  send: {
    icon: ArrowUpRight,
    color: "var(--loss)",
    bg: "rgba(255, 51, 102, 0.1)",
  },
  security: {
    icon: ShieldCheck,
    color: "var(--neon-purple)",
    bg: "rgba(112, 0, 255, 0.1)",
  },
  price: {
    icon: TrendingUp,
    color: "var(--neon-cyan)",
    bg: "rgba(0, 240, 255, 0.1)",
  },
};

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [shaking, setShaking] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleBellClick = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
    setOpen((prev) => !prev);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (id: string) => {
    markRead(id);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        id="notification-bell"
        onClick={handleBellClick}
        className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[var(--neon-cyan)] transition-all hover:shadow-[0_0_14px_rgba(0,240,255,0.2)]"
      >
        <Bell className={`w-4 h-4 ${shaking ? "animate-shake" : ""}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--loss)] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_var(--loss)]">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-14 w-[380px] max-h-[480px] glass overflow-hidden z-50"
          style={{
            animation: "notifSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base">Хабарламалар</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] text-xs font-semibold">
                  {unreadCount} жаңа
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-[var(--neon-cyan)]"
                  title="Барлығын оқылды деп белгілеу"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-[var(--loss)]"
                  title="Барлығын тазалау"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="overflow-y-auto max-h-[380px] p-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Bell className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm font-medium">Хабарлама жоқ</p>
                <p className="text-xs mt-1 opacity-60">Сіз барлық жаңалықтарды оқыдыңыз!</p>
              </div>
            ) : (
              notifications.map((n, i) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                const isExpanded = expandedId === n.id;
                
                return (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.id)}
                    className={`group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5 ${
                      !n.read ? "bg-white/[0.03]" : ""
                    } ${isExpanded ? "bg-white/5" : ""}`}
                    style={{
                      animation: `notifItemIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s both`,
                    }}
                  >
                    {/* Unread dot */}
                    {!n.read && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_6px_var(--neon-cyan)]" />
                    )}

                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: config.bg }}
                    >
                      <Icon className="w-4 h-4" style={{ color: config.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-semibold leading-tight ${!isExpanded ? "truncate" : ""} ${!n.read ? "text-white" : "text-muted-foreground"}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0 mt-0.5">
                          {n.time}
                        </span>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 leading-relaxed ${!isExpanded ? "truncate" : ""}`}>{n.message}</p>
                      
                      {isExpanded && (
                        <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
                          <button className="text-[10px] font-semibold px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white">
                            Толығырақ
                          </button>
                          {(n.type === "receive" || n.type === "send") && (
                            <button className="text-[10px] font-semibold px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 transition-colors text-muted-foreground hover:text-white">
                              TxHash көру
                            </button>
                          )}
                          {n.type === "security" && (
                            <button className="text-[10px] font-semibold px-3 py-1.5 rounded-md bg-[rgba(255,51,102,0.1)] text-[var(--loss)] hover:bg-[rgba(255,51,102,0.2)] transition-colors">
                              Мен емеспін!
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(n.id);
                      }}
                      className="flex-shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-muted-foreground hover:text-[var(--loss)]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
