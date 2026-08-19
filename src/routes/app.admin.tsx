import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { Proximamente } from "@/components/proximamente";

export const Route = createFileRoute("/app/admin")({
  head: () => ({
    meta: [
      { title: "Mantenedores — Rendix" },
      { name: "description", content: "Panel de administración: usuarios, roles, categorías y centros de costo." },
      { property: "og:title", content: "Mantenedores — Rendix" },
      { property: "og:description", content: "CRUD de empleados y asignación de roles del sistema." },
    ],
  }),
  component: () => (
    <Proximamente
      icon={Settings2}
      titulo="Panel de Administrador"
      descripcion="Tabla de empleados con alta/baja de usuarios, asignación de roles (Admin, Operador, Jefatura, Tesorería) y mantenedores de categorías y centros de costo. Se construye en la siguiente iteración."
    />
  ),
});
