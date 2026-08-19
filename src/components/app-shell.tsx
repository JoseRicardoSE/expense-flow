import { Link, useRouterState } from "@tanstack/react-router";
import {
  BadgeCheck,
  Banknote,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Receipt,
  Settings2,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";
import { ROLES, type Rol } from "@/lib/mock-data";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Receipt;
  roles: Rol[];
};

const NAV: NavItem[] = [
  { to: "/app", label: "Mis gastos", icon: Receipt, roles: ["operador", "jefatura", "tesoreria", "admin"] },
  { to: "/app/nuevo", label: "Nuevo gasto", icon: PlusCircle, roles: ["operador", "jefatura", "tesoreria", "admin"] },
  { to: "/app/aprobaciones", label: "Aprobaciones", icon: BadgeCheck, roles: ["jefatura", "admin"] },
  { to: "/app/finanzas", label: "Finanzas", icon: LayoutDashboard, roles: ["tesoreria", "admin"] },
  { to: "/app/admin", label: "Mantenedores", icon: Settings2, roles: ["admin"] },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { usuario, setRol } = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV.filter((i) => i.roles.includes(usuario.rol));
  const mobileItems = items.slice(0, 4);

  return (
    <div className="min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[268px] flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
        <Link to="/app" className="mb-8 flex items-center gap-3 px-2">
          <span className="bg-brand-gradient flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-lift">
            <Wallet className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight">Rendix</span>
            <span className="block text-xs text-muted-foreground">Gastos & Caja Chica</span>
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {items.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "press flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                    : "hover:bg-sidebar-accent/60",
                )}
              >
                <item.icon className={cn("size-4.5", active && "text-primary")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="glass mt-4 rounded-2xl p-3">
          <p className="px-1 pb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Vista demo por rol
          </p>
          <select
            value={usuario.rol}
            onChange={(e) => setRol(e.target.value as Rol)}
            className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <div className="mt-3 flex items-center gap-3 rounded-xl px-1 py-1">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {usuario.iniciales}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{usuario.nombre}</span>
              <span className="block truncate text-xs text-muted-foreground">{usuario.cargo}</span>
            </span>
            <Link to="/" className="press rounded-lg p-2 text-muted-foreground hover:bg-secondary">
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[268px]">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/70 bg-background/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-xl text-primary-foreground">
              <Wallet className="size-4.5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Rendix</span>
              <span className="block text-[11px] text-muted-foreground">{usuario.nombre}</span>
            </span>
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold tracking-tight">Hola, {usuario.nombre.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground">{usuario.centroCosto}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground sm:flex">
              <Banknote className="size-3.5 text-accent" />
              Caja chica: $150.000
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary lg:hidden">
              {usuario.iniciales}
            </span>
          </div>
        </header>

        <main className="px-4 pt-5 pb-28 lg:px-8 lg:pb-10">{children}</main>
      </div>

      <nav className="glass fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl px-2 py-2 lg:hidden">
        {mobileItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "press flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
