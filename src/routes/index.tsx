import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rendix — Acceso corporativo a rendiciones y caja chica" },
      {
        name: "description",
        content:
          "Ingresa a Rendix para digitalizar rendiciones de gastos, aprobaciones y caja chica de tu empresa.",
      },
      { property: "og:title", content: "Rendix — Rendiciones y caja chica" },
      {
        property: "og:description",
        content: "Plataforma corporativa para gastos en terreno, aprobaciones y control de tesorería.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("carlos.fuentes@empresa.cl");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/app" }), 700);
  }

  return (
    <div className="bg-deep-gradient relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="animate-float-slow pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="animate-float-slow pointer-events-none absolute -right-20 -bottom-40 size-[460px] rounded-full bg-accent/25 blur-[130px]" />

      <div className="relative grid w-full max-w-5xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <section className="animate-rise hidden text-balance lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
            <ShieldCheck className="size-3.5" /> Control de acceso por roles
          </span>
          <h1 className="mt-6 text-5xl leading-[1.05] font-semibold text-white">
            Rendiciones sin papeles,
            <span className="block bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              con trazabilidad total.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
            Captura el gasto en terreno, adjunta el respaldo desde el celular y deja que el flujo de
            aprobación llegue listo a contabilidad.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {[
              { k: "-72%", v: "tiempo de cierre" },
              { k: "100%", v: "gastos con respaldo" },
              { k: "4 roles", v: "flujo controlado" },
            ].map((i) => (
              <div key={i.v} className="glass-dark rounded-2xl px-3 py-4">
                <dt className="text-lg font-semibold text-white">{i.k}</dt>
                <dd className="mt-1 text-[11px] leading-tight text-white/60">{i.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="animate-rise glass-dark rounded-3xl p-7 sm:p-9">
          <div className="mb-7 flex items-center gap-3">
            <span className="bg-brand-gradient flex size-11 items-center justify-center rounded-2xl text-primary-foreground shadow-lift">
              <Wallet className="size-5" />
            </span>
            <div>
              <p className="text-base font-semibold text-white">Rendix</p>
              <p className="text-xs text-white/55">Gastos & Caja Chica</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-white">Iniciar sesión</h2>
          <p className="mt-1 text-sm text-white/55">Usa tu correo corporativo para continuar.</p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-white/70">Correo corporativo</span>
              <span className="relative block">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/8 py-3 pr-3 pl-10 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/30 focus:bg-white/12"
                  placeholder="nombre@empresa.cl"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-white/70">Contraseña</span>
              <span className="relative block">
                <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/8 py-3 pr-3 pl-10 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/30 focus:bg-white/12"
                  placeholder="••••••••"
                />
              </span>
            </label>

            <div className="flex items-center justify-between pt-1 text-xs text-white/60">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" defaultChecked className="size-3.5 accent-white/80" />
                Recordarme
              </label>
              <button type="button" className="transition hover:text-white">
                ¿Olvidaste tu clave?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="press bg-brand-gradient mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-primary-foreground shadow-lift disabled:opacity-70"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {loading ? "Verificando…" : "Ingresar"}
              {!loading && <ArrowRight className="size-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-white/40">
            Ambiente de demostración con datos ficticios · Rendix 2026
          </p>
        </section>
      </div>
    </div>
  );
}
