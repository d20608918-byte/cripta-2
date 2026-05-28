# NexWallet 🚀

![NexWallet Preview](https://via.placeholder.com/1200x600/020204/00f0ff?text=NexWallet+Crypto+Dashboard)

**NexWallet** is a next-generation cryptocurrency wallet and dashboard built with modern web technologies. It features a stunning glassmorphism design with neon accents, providing a premium and responsive user experience for managing crypto assets, tracking market trends, and executing simulated trades.

---

## ✨ Features

- **Modern Glassmorphism UI:** A sleek, semi-transparent design with dynamic neon lighting effects (Cyan & Purple accents).
- **Dark & Light Mode:** Fully adaptive theme system with customized variables for both modes.
- **Multi-Language Support (i18n):** Seamlessly switch between Kazakh (Қазақша), English, and Spanish.
- **Multi-Currency Display:** View your balances and crypto prices in USD, EUR, KZT, and GBP.
- **Interactive Charts:** Professional trading-style Area and Line charts built with `recharts`, featuring smooth opening animations and hover tooltips.
- **Marketplace & Exchange:** Simulated crypto trading interface with real-time price trends and smooth transition effects.
- **AI Support Chatbot:** An integrated smart support chat that automatically answers basic cryptocurrency questions.
- **Portfolio Analytics:** Visual distribution of assets using Pie charts, plus AI-generated investment recommendations.
- **Supabase Authentication:** Secure login, registration, and user session management.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router/latest)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS variables and UI animations.
- **Backend/Auth:** [Supabase](https://supabase.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and npm/bun installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neon-wallet-main.git
   cd neon-wallet-main
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in the `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Sidebar, Navbar, Chat, etc.)
│   └── ui/              # Base UI components (Radix/Tailwind based)
├── lib/                 # Core utilities, context providers, and mock data
│   ├── auth.tsx         # Supabase Auth context
│   ├── currency.tsx     # Fiat currency context
│   ├── i18n.tsx         # Multi-language context and translations
│   ├── supabase.ts      # Supabase client initialization
│   └── mock-data.ts     # Mock data for assets and transactions
├── routes/              # Page components managed by TanStack Router
│   ├── index.tsx        # Dashboard page
│   ├── portfolio.tsx    # Portfolio & AI recommendations
│   ├── marketplace.tsx  # Crypto marketplace with trading charts
│   ├── exchange.tsx     # Coin swap interface
│   ├── history.tsx      # Transaction history
│   └── settings.tsx     # App preferences (Theme, Language, Security)
├── styles.css           # Global CSS variables, custom animations, glassmorphism
└── main.tsx             # Application entry point
```

---

## 🎨 Design System

The application relies heavily on a centralized design system located in `styles.css`. 
- **Glassmorphism:** Uses `backdrop-filter: blur(16px)` along with semi-transparent backgrounds and subtle borders.
- **Gradients & Shadows:** `var(--neon-cyan)` and `var(--neon-purple)` are used to create glowing hover effects.
- **Animations:** Custom keyframe animations (`float-up`, `slide-in`, smooth grid expansion) ensure a fluid user experience.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](#) if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
