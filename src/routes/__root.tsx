import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Particles } from "@/components/Particles";
import { SupportChat } from "@/components/SupportChat";
import { CurrencyProvider } from "@/lib/currency";
import { AuthProvider, useAuth } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/i18n";

const AUTH_ROUTES = ["/login", "/register"];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass p-10 text-center max-w-md">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">This page drifted into the void.</p>
        <Link to="/" className="btn-neon inline-block mt-6 px-6 py-2.5 rounded-full font-medium">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass p-10 text-center max-w-md">
        <h1 className="text-xl font-semibold">Something glitched</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="btn-neon inline-block mt-6 px-6 py-2.5 rounded-full font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function AuthGate() {
  const { user, isLoading } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    if (isLoading) return;
    if (!user && !isAuthPage) {
      navigate({ to: "/login" });
    }
    if (user && isAuthPage) {
      navigate({ to: "/" });
    }
  }, [user, isLoading, isAuthPage, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-10 h-10 border-3 border-white/20 border-t-[var(--neon-cyan)] rounded-full animate-spin" />
      </div>
    );
  }

  // Auth pages — no sidebar/topbar
  if (isAuthPage) {
    return <Outlet />;
  }

  // Protected pages — full layout
  if (!user) return null;

  return (
    <div className="relative z-10 min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <Sidebar />
      <main className="md:ml-64 p-4 md:p-8 pb-24 md:pb-8 flex-1">
        <TopBar />
        <Outlet />
      </main>
      
      {/* Support Chat */}
      <SupportChat />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CurrencyProvider>
              <Particles />
              <AuthGate />
            </CurrencyProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
