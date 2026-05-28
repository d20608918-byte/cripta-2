export type Asset = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  amount: number;
  color: string;
  trend: number[];
};

export const assets: Asset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 209701.26,
    change: 4.27,
    amount: 1.245,
    color: "#f7931a",
    trend: [96, 92, 95, 89, 93, 98, 97, 101, 99, 103, 102, 105],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 9746.84,
    change: 6.84,
    amount: 12.78,
    color: "#627eea",
    trend: [42, 39, 44, 41, 46, 43, 48, 45, 47, 49, 48, 50],
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 625.14,
    change: 3.15,
    amount: 145.6,
    color: "#9945ff",
    trend: [280, 275, 285, 292, 288, 295, 290, 302, 298, 305, 300, 313],
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 2.48,
    change: 2.91,
    amount: 5400,
    color: "#0033ad",
    trend: [1.05, 1.02, 1.08, 1.04, 1.12, 1.09, 1.15, 1.11, 1.18, 1.22, 1.20, 1.24],
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 595.34,
    change: -1.2,
    amount: 15.3,
    color: "#f3ba2f",
    trend: [600, 615, 605, 620, 610, 595, 605, 590, 585, 595, 580, 595],
  },
  {
    symbol: "XRP",
    name: "Ripple",
    price: 0.52,
    change: 5.4,
    amount: 12500,
    color: "#23292f",
    trend: [0.45, 0.43, 0.47, 0.44, 0.48, 0.46, 0.50, 0.47, 0.51, 0.49, 0.53, 0.52],
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.16,
    change: 12.5,
    amount: 45000,
    color: "#c2a633",
    trend: [0.12, 0.11, 0.14, 0.12, 0.15, 0.13, 0.16, 0.14, 0.17, 0.15, 0.18, 0.16],
  },
];

export type Transaction = {
  id: string;
  type: "received" | "sent" | "swap";
  asset: string;
  amount: number;
  usd: number;
  date: string;
};

export const transactions: Transaction[] = [
  { id: "1", type: "received", asset: "BTC", amount: 0.025, usd: 2621.3, date: "Today, 10:24" },
  { id: "2", type: "swap", asset: "ETH → SOL", amount: 2.5, usd: 12183.6, date: "Today, 09:12" },
  { id: "3", type: "sent", asset: "SOL", amount: 12.4, usd: 3875.9, date: "Yesterday, 18:45" },
  { id: "4", type: "received", asset: "ETH", amount: 1.8, usd: 8772.2, date: "Yesterday, 14:02" },
  { id: "5", type: "swap", asset: "BTC → ETH", amount: 0.15, usd: 15727.6, date: "May 17, 22:30" },
  { id: "6", type: "sent", asset: "ADA", amount: 1200, usd: 1488.0, date: "May 16, 11:18" },
];
