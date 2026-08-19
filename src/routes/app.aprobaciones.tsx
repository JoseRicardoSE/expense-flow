import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { Proximamente } from "@/components/proximamente";

export const Route = createFileRoute("/app/aprobaciones")({
  head: () => ({
    meta: [
      { title: "Aprobaciones — Rendix" },
      { name: "description", content: "Bandeja de aprobación de gastos pendientes del equipo." },
      { property: "og:title", content: "Aprobaciones — Rendix" },
      { property: "og:description", content: "Revisa, aprueba o rechaza las rendiciones de tu equipo." },
    ],
  }),
  component: () => (
    <Proximamente
      icon={BadgeCheck}
      titulo="Bandeja de aprobaciones"
      descripcion="Vista de jefatura con tarjetas de gastos pendientes, visor de comprobante y acciones rápidas de aprobar o rechazar. Se construye en la siguiente iteración."
    />
  ),
});
