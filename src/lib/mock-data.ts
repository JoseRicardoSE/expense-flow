export type Rol = "admin" | "operador" | "jefatura" | "tesoreria";

export type EstadoGasto = "pendiente" | "aprobado" | "rechazado" | "pagado";

export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  cargo: string;
  centroCosto: string;
  iniciales: string;
};

export type Gasto = {
  id: string;
  folio: string;
  usuarioId: string;
  monto: number;
  fecha: string;
  categoria: string;
  descripcion: string;
  centroCosto: string;
  estado: EstadoGasto;
  comprobante?: string;
  comentario?: string;
};

export const ROLES: { value: Rol; label: string; descripcion: string }[] = [
  { value: "operador", label: "Operario / Solicitante", descripcion: "Ingresa y sigue sus propias rendiciones" },
  { value: "jefatura", label: "Jefatura Directa", descripcion: "Aprueba o rechaza gastos de su equipo" },
  { value: "tesoreria", label: "Finanzas / Tesorería", descripcion: "Control global, pagos y exportación" },
  { value: "admin", label: "Administrador", descripcion: "Mantenedores, usuarios y parámetros" },
];

export const CATEGORIAS = [
  "Combustible",
  "Peaje",
  "Viáticos / Alimentación",
  "Alojamiento",
  "Insumos y Materiales",
  "Mantención Vehículo",
  "Transporte / Taxi",
  "Otros",
];

export const CENTROS_COSTO = [
  "CC-100 Operaciones Norte",
  "CC-200 Logística Santiago",
  "CC-300 Proyectos Sur",
  "CC-400 Administración",
];

export const USUARIO_ACTUAL: Usuario = {
  id: "u-001",
  nombre: "Carlos Fuentes",
  email: "carlos.fuentes@empresa.cl",
  rol: "operador",
  cargo: "Transportista Senior",
  centroCosto: "CC-200 Logística Santiago",
  iniciales: "CF",
};

export const MIS_GASTOS: Gasto[] = [
  {
    id: "g-101",
    folio: "RD-2048",
    usuarioId: "u-001",
    monto: 48990,
    fecha: "2026-08-18",
    categoria: "Combustible",
    descripcion: "Carga de diésel Copec Ruta 5 Norte",
    centroCosto: "CC-200 Logística Santiago",
    estado: "pendiente",
    comprobante: "boleta_copec.jpg",
  },
  {
    id: "g-102",
    folio: "RD-2041",
    usuarioId: "u-001",
    monto: 7600,
    fecha: "2026-08-17",
    categoria: "Peaje",
    descripcion: "Peaje Angostura ida y vuelta",
    centroCosto: "CC-200 Logística Santiago",
    estado: "aprobado",
    comprobante: "peaje_angostura.jpg",
  },
  {
    id: "g-103",
    folio: "RD-2039",
    usuarioId: "u-001",
    monto: 12500,
    fecha: "2026-08-16",
    categoria: "Viáticos / Alimentación",
    descripcion: "Almuerzo en ruta - turno extendido",
    centroCosto: "CC-200 Logística Santiago",
    estado: "rechazado",
    comentario: "Excede el tope diario de viáticos ($9.000).",
  },
  {
    id: "g-104",
    folio: "RD-2031",
    usuarioId: "u-001",
    monto: 34200,
    fecha: "2026-08-12",
    categoria: "Mantención Vehículo",
    descripcion: "Cambio de neumático trasero derecho",
    centroCosto: "CC-200 Logística Santiago",
    estado: "pagado",
    comprobante: "factura_vulcanizacion.pdf",
  },
  {
    id: "g-105",
    folio: "RD-2024",
    usuarioId: "u-001",
    monto: 5300,
    fecha: "2026-08-09",
    categoria: "Transporte / Taxi",
    descripcion: "Traslado a bodega Pudahuel",
    centroCosto: "CC-200 Logística Santiago",
    estado: "pagado",
  },
];

export const ESTADO_META: Record<
  EstadoGasto,
  { label: string; className: string; dot: string }
> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-warning/15 text-warning-foreground border-warning/30",
    dot: "bg-warning",
  },
  aprobado: {
    label: "Aprobado",
    className: "bg-success/15 text-success border-success/30",
    dot: "bg-success",
  },
  rechazado: {
    label: "Rechazado",
    className: "bg-destructive/12 text-destructive border-destructive/30",
    dot: "bg-destructive",
  },
  pagado: {
    label: "Pagado",
    className: "bg-info/12 text-info border-info/30",
    dot: "bg-info",
  },
};

export function formatCLP(monto: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(monto);
}

export function formatFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${fecha}T12:00:00`));
}
