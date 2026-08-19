import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Camera, Filter, Plus, Receipt } from "lucide-react";
import { useState } from "react";
import {
  ESTADO_META,
  MIS_GASTOS,
  formatCLP,
  formatFecha,
  type EstadoGasto,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Mis gastos — Rendix" },
      {
        name: "description",
        content: "Historial de rendiciones del solicitante con estados pendiente, aprobado, rechazado y pagado.",
      },
      { property: "og:title", content: "Mis gastos — Rendix" },
      { property: "og:description", content: "Sigue el estado de cada gasto rendido desde terreno." },
    ],
  }),
  component: MisGastos,
});

const FILTROS: { value: EstadoGasto | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "pendiente", label: "Pendientes" },
  { value: "aprobado", label: "Aprobados" },
  { value: "rechazado", label: "Rechazados" },
  { value: "pagado", label: "Pagados" },
];

function MisGastos() {
  const [filtro, setFiltro] = useState<EstadoGasto | "todos">("todos");
  const gastos = MIS_GASTOS.filter((g) => filtro === "todos" || g.estado === filtro);

  const totalMes = MIS_GASTOS.reduce((a, g) => a + g.monto, 0);
  const pendiente = MIS_GASTOS.filter((g) => g.estado === "pendiente").reduce((a, g) => a + g.monto, 0);
  const reembolsado = MIS_GASTOS.filter((g) => g.estado === "pagado").reduce((a, g) => a + g.monto, 0);

  return (
    <div className="animate-rise mx-auto w-full max-w-5xl space-y-6">
      <section className="bg-deep-gradient relative overflow-hidden rounded-3xl p-6 shadow-lift sm:p-8">
        <div className="animate-float-slow pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-accent/25 blur-3xl" />
        <p className="text-xs font-medium tracking-wide text-white/60 uppercase">Rendido en agosto</p>
        <p className="mt-2 text-4xl font-semibold text-white">{formatCLP(totalMes)}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
          <div className="glass-dark rounded-2xl px-4 py-3">
            <p className="text-[11px] text-white/60">Por aprobar</p>
            <p className="mt-1 text-lg font-semibold text-white">{formatCLP(pendiente)}</p>
          </div>
          <div className="glass-dark rounded-2xl px-4 py-3">
            <p className="text-[11px] text-white/60">Reembolsado</p>
            <p className="mt-1 text-lg font-semibold text-white">{formatCLP(reembolsado)}</p>
          </div>
        </div>

        <Link
          to="/app/nuevo"
          className="press mt-7 flex items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-semibold text-foreground shadow-lift sm:w-auto sm:px-7"
        >
          <Plus className="size-5" /> Nuevo gasto
        </Link>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Mis rendiciones</h2>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Filter className="size-3.5" /> {gastos.length} de {MIS_GASTOS.length}
          </span>
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={cn(
                "press shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium",
                filtro === f.value
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-secondary",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {gastos.map((g) => {
            const meta = ESTADO_META[g.estado];
            return (
              <li
                key={g.id}
                className="press group rounded-2xl border border-border bg-card p-4 shadow-soft hover:border-primary/25"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                    <Receipt className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="truncate text-sm font-semibold">{g.categoria}</p>
                      <p className="text-sm font-semibold whitespace-nowrap">{formatCLP(g.monto)}</p>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{g.descripcion}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
                          meta.className,
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", meta.dot)} />
                        {meta.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{formatFecha(g.fecha)}</span>
                      <span className="text-[11px] text-muted-foreground">· {g.folio}</span>
                      {g.comprobante && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-accent-foreground/70">
                          <Camera className="size-3" /> respaldo
                        </span>
                      )}
                    </div>
                    {g.comentario && (
                      <p className="mt-3 rounded-xl bg-destructive/8 px-3 py-2 text-[11px] text-destructive">
                        {g.comentario}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="mt-1 size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
