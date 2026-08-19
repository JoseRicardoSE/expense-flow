import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { CATEGORIAS, CENTROS_COSTO, formatCLP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/app/nuevo")({
  head: () => ({
    meta: [
      { title: "Nuevo gasto — Rendix" },
      {
        name: "description",
        content: "Formulario mobile-first para rendir un gasto en terreno con foto del comprobante.",
      },
      { property: "og:title", content: "Nuevo gasto — Rendix" },
      { property: "og:description", content: "Registra monto, categoría, descripción y respaldo fotográfico." },
    ],
  }),
  component: NuevoGasto,
});

function NuevoGasto() {
  const navigate = useNavigate();
  const { usuario } = useSession();
  const inputFile = useRef<HTMLInputElement>(null);
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [categoria, setCategoria] = useState("");
  const [centroCosto, setCentroCosto] = useState(usuario.centroCosto);
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState<{ nombre: string; url: string } | null>(null);
  const [drag, setDrag] = useState(false);
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo">("idle");

  const montoNumero = Number(monto.replace(/\D/g, ""));

  function tomarArchivo(file?: File | null) {
    if (!file) return;
    setArchivo({ nombre: file.name, url: URL.createObjectURL(file) });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    setTimeout(() => setEstado("listo"), 900);
  }

  if (estado === "listo") {
    return (
      <div className="animate-rise mx-auto flex max-w-md flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
        <span className="flex size-16 items-center justify-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="size-8" />
        </span>
        <h2 className="mt-5 text-xl font-semibold">Gasto enviado a aprobación</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Folio RD-2049 por {formatCLP(montoNumero || 0)} quedó en estado pendiente y notificamos a tu jefatura
          directa.
        </p>
        <div className="mt-7 grid w-full gap-2">
          <button
            onClick={() => navigate({ to: "/app" })}
            className="press bg-brand-gradient rounded-xl py-3 text-sm font-semibold text-primary-foreground shadow-lift"
          >
            Ver mis rendiciones
          </button>
          <button
            onClick={() => {
              setEstado("idle");
              setMonto("");
              setDescripcion("");
              setCategoria("");
              setArchivo(null);
            }}
            className="press rounded-xl border border-border py-3 text-sm font-medium hover:bg-secondary"
          >
            Rendir otro gasto
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="animate-rise mx-auto w-full max-w-2xl space-y-5">
      <button
        type="button"
        onClick={() => navigate({ to: "/app" })}
        className="press inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Volver
      </button>

      <div>
        <h1 className="text-2xl font-semibold">Nuevo gasto</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Completa los datos y adjunta el respaldo. Se valida antes de enviarse a tu jefatura.
        </p>
      </div>

      <section className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <label className="block">
          <span className="mb-2 block text-xs font-medium text-muted-foreground">Monto (CLP)</span>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface-2 px-4 py-3 focus-within:ring-2 focus-within:ring-ring/35">
            <span className="text-2xl font-semibold text-muted-foreground">$</span>
            <input
              inputMode="numeric"
              required
              value={monto ? new Intl.NumberFormat("es-CL").format(montoNumero) : ""}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none"
            />
          </div>
        </label>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-muted-foreground">Fecha del gasto</span>
            <input
              type="date"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/35"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-muted-foreground">Categoría</span>
            <select
              required
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/35"
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs font-medium text-muted-foreground">Centro de costo</span>
            <select
              value={centroCosto}
              onChange={(e) => setCentroCosto(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/35"
            >
              {CENTROS_COSTO.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs font-medium text-muted-foreground">Descripción</span>
            <textarea
              required
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Carga de combustible en ruta a Los Andes"
              className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/35"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <p className="text-sm font-semibold">Comprobante</p>
        <p className="mt-1 text-xs text-muted-foreground">Boleta, factura o voucher. JPG, PNG o PDF hasta 10 MB.</p>

        {archivo ? (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-3">
            <img
              src={archivo.url}
              alt="Vista previa del comprobante"
              className="size-16 rounded-xl border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{archivo.nombre}</p>
              <p className="text-xs text-success">Adjunto listo</p>
            </div>
            <button
              type="button"
              onClick={() => setArchivo(null)}
              className="press rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              tomarArchivo(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputFile.current?.click()}
            className={cn(
              "press mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-center",
              drag ? "border-primary bg-primary/5" : "border-border bg-surface-2 hover:border-primary/40",
            )}
          >
            <span className="bg-brand-gradient flex size-12 items-center justify-center rounded-2xl text-primary-foreground shadow-lift">
              <ImagePlus className="size-5" />
            </span>
            <p className="mt-3 text-sm font-medium">Arrastra la foto aquí</p>
            <p className="text-xs text-muted-foreground">o toca para elegir desde tu galería</p>
            <span className="press mt-4 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-medium">
              <Camera className="size-4" /> Tomar foto
            </span>
          </div>
        )}

        <input
          ref={inputFile}
          type="file"
          accept="image/*,application/pdf"
          capture="environment"
          className="hidden"
          onChange={(e) => tomarArchivo(e.target.files?.[0])}
        />
      </section>

      <div className="sticky bottom-20 z-10 lg:static">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="press bg-brand-gradient flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold text-primary-foreground shadow-lift disabled:opacity-70"
        >
          {estado === "enviando" && <Loader2 className="size-4 animate-spin" />}
          {estado === "enviando" ? "Enviando…" : "Enviar a aprobación"}
        </button>
      </div>
    </form>
  );
}
