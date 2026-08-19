# Expense Flow

# Brief de Proyecto para Lovable 


Actúa como un desarrollador experto y diseñador UX/UI. Necesito que construyas una aplicación web de gestión de gastos, rendiciones y caja chica orientada al sector empresarial. 




Esta es una aplicación CRUD con una lógica determinística estricta y Control de Acceso Basado en Roles (RBAC). El Stack tecnológico en el que nos basaremos (y para el que debes preparar los componentes) es React, Tailwind CSS y posteriormente Supabase para el backend.




**Estética y Diseño:**

El diseño debe ser extremadamente premium, moderno y corporativo. Utiliza "Glassmorphism" sutil donde sea necesario, una paleta de colores limpia (estilo dashboard SaaS moderno), tipografía moderna (como Inter), y micro-animaciones en botones y transiciones para que la app se sienta fluida. 




**Flujos de Usuario y Roles a diseñar:**

Es vital que el diseño sea responsivo, con un enfoque "Mobile-First" para los operarios, y "Desktop" para los roles administrativos. Utiliza Mock Data (datos de prueba ficticios) para ilustrar todas las vistas.




1. **Pantalla de Login:**

   - Un inicio de sesión corporativo, minimalista y elegante.




2. **Vista Usuario Final (Solicitante / Mobile-First):**

   - Una interfaz móvil limpia.

   - **Sección principal:** Un botón grande/prominente para "Nuevo Gasto".

   - **Formulario de Ingreso:** Campos para Monto, Fecha, Categoría (Dropdown), Descripción y un área de Drag & Drop o botón amigable para subir la Foto del Comprobante.

   - **Lista de Gastos:** Un historial visual de sus gastos con tags de estado (Pendiente en Amarillo, Aprobado en Verde, Rechazado en Rojo).




3. **Vista Jefatura (Aprobador):**

   - Una bandeja de entrada o panel con tarjetas o filas de los gastos pendientes de su equipo.

   - Botones rápidos de acción ("Aprobar" / "Rechazar") y opción de ver el comprobante adjunto.




4. **Vista Finanzas / Tesorería (Dashboard Desktop):**

   - Un panel de control de escritorio complejo.

   - Métricas clave en la parte superior (Total Gastado, Total Pendiente).

   - Una tabla de datos completa (Data-table) con todos los gastos. Filtros por Centro de Costo, Estado, Usuario y Fecha.

   - Un botón de acción global muy visible que diga "Exportar a CSV".




5. **Panel de Administrador (Mantenedores):**

   - Una vista de configuración para un CRUD de usuarios. Una "Tabla de Empleados" simulada donde se pueda asignar el rol (Admin, Operador, Jefatura, Tesorería) y gestionar accesos.




**Instrucción de Inicio:**

Para empezar, genera la estructura base de navegación (Sidebar para Desktop, Bottom Tabs para Móvil) y diseña la **Pantalla de Login** y la **Vista del Usuario Final (Solicitante)** con el formulario de ingreso de gastos. Asegúrate de que la estética sea impactante (efecto WOW).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/29478fc3-0dfb-4352-92d4-bd5bca40f938).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
