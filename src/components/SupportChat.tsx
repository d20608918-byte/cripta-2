import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
};

function getBotResponse(query: string): string {
  const lower = query.toLowerCase();
  
  if (lower.includes("биткоин") || lower.includes("bitcoin") || lower.includes("btc")) {
    return "Bitcoin (BTC) – бұл әлемдегі ең алғашқы және ең танымал орталықтандырылмаған криптовалюта. Оны 2009 жылы Сатоши Накамото ойлап тапқан.";
  }
  if (lower.includes("эфириум") || lower.includes("эфир") || lower.includes("ethereum") || lower.includes("eth")) {
    return "Ethereum (ETH) – бұл смарт-келісімшарттар мен орталықтандырылмаған қосымшаларды (dApps) құруға арналған блокчейн платформасы.";
  }
  if (lower.includes("сатып алу") || lower.includes("қалай алуға болады") || lower.includes("сатып алам")) {
    return "Криптовалюта сатып алу үшін сол жақтағы мәзірден «Магазин» бөліміне өтіңіз. Сол жерден қажетті монетаны таңдап, тиісті соманы енгізіп, «Сатып алу» түймесін басыңыз.";
  }
  if (lower.includes("баға") || lower.includes("курс") || lower.includes("қанша тұрады") || lower.includes("қанша")) {
    return "Монеталардың нақты уақыттағы бағасын «Басты бет» немесе «Магазин» бөлімдерінен көре аласыз. Онда соңғы 24 сағаттағы өзгерістер де көрсетілген.";
  }
  if (lower.includes("сәлем") || lower.includes("салам") || lower.includes("hello") || lower.includes("hi") || lower.includes("ассалаум")) {
    return "Сәлем! Мен NexWallet-тің жасанды интеллект көмекшісімін 🤖. Сізге криптовалюталар туралы қандай ақпарат қажет?";
  }
  if (lower.includes("криптовалюта") || lower.includes("крипта") || lower.includes("блокчейн")) {
    return "Криптовалюта – бұл криптографиямен қорғалған цифрлық немесе виртуалды валюта. Ол банктер сияқты орталықтандырылған органдарсыз, блокчейн технологиясы арқылы жұмыс істейді.";
  }
  if (lower.includes("комиссия") || lower.includes("fee") || lower.includes("процент")) {
    return "NexWallet-те платформаның стандартты транзакциялық комиссиясы 1.5% құрайды. Бұл нарықтағы өте тиімді көрсеткіш.";
  }
  if (lower.includes("рақмет") || lower.includes("рахмет") || lower.includes("керемет")) {
    return "Оқасы жоқ! Тағы сұрақтарыңыз болса, қоя беріңіз. Сәтті сауда тілеймін! 🚀";
  }

  return "Кешіріңіз, сұрағыңызды толық түсінбедім. Мен криптовалюта, монеталар бағасы, блокчейн және платформаны қалай пайдалану керектігі туралы сұрақтарға жауап бере аламын. Сұрағыңызды басқаша қойып көріңізші.";
}

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Сәлеметсіз бе! Мен NexWallet AI көмекшісімін 🤖. Криптовалюта, блокчейн немесе платформа туралы сұрақтарыңыз болса, маған қоя беріңіз!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: getBotResponse(input.trim()),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 800);
  };

  return (
    <>
      {/* Support Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-14 h-14 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full md:w-[350px] h-[500px] max-h-[80vh] glass z-50 flex flex-col md:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-between opacity-90">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">NexWallet AI Көмекшісі</h3>
                <p className="text-[10px] text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--profit)]"></span>
                  Онлайн
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isBot ? "" : "flex-row-reverse"}`}>
                  <div className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center ${isBot ? "bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)]" : "bg-white/10"}`}>
                    {isBot ? <Bot className="w-3 h-3 text-white" /> : <UserIcon className="w-3 h-3 text-white" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${isBot ? "bg-white/5 rounded-bl-none" : "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] text-white rounded-br-none"}`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] mt-1 block ${isBot ? "text-muted-foreground" : "text-white/70 text-right"}`}>{msg.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-black/40">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Хабарлама жазыңыз..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm outline-none focus:border-[var(--neon-cyan)] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--neon-cyan)] text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
