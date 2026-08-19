import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SessionProvider } from "@/lib/session";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SessionProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </SessionProvider>
  );
}
