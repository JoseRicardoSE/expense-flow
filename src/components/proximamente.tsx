import type { LucideIcon } from "lucide-react";

export function Proximamente({
  icon: Icon,
  titulo,
  descripcion,
}: {
  icon: LucideIcon;
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="animate-rise mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      <span className="bg-brand-gradient mx-auto flex size-14 items-center justify-center rounded-2xl text-primary-foreground shadow-lift">
        <Icon className="size-6" />
      </span>
      <h1 className="mt-5 text-xl font-semibold">{titulo}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{descripcion}</p>
    </div>
  );
}
