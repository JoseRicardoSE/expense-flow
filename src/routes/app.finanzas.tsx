import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { Proximamente } from "@/components/proximamente";

export const Route = createFileRoute("/app/finanzas")({
  head: () => ({
    meta: [
      { title: "Finanzas — Rendix" },
      { name: "description", content: "Dashboard de tesorería con métricas, tabla de gastos y exportación a CSV." },
      { property: "og:title", content: "Finanzas — Rendix" },
      { property: "og:description", content: "Control global de gastos, filtros por centro de costo y pagos." },
    ],
  }),
  component: () => (
    <Proximamente
      icon={LayoutDashboard}
      titulo="Dashboard de Finanzas"
      descripcion="Métricas de gasto total y pendiente, data-table con filtros por centro de costo, estado, usuario y fecha, más exportación a CSV. Se construye en la siguiente iteración."
    />
  ),
});
