import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ROLES, USUARIO_ACTUAL, type Rol, type Usuario } from "./mock-data";

type SessionValue = {
  usuario: Usuario;
  setRol: (rol: Rol) => void;
  hydrated: boolean;
};

const SessionContext = createContext<SessionValue | null>(null);

const STORAGE_KEY = "rendiciones.rol";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [rol, setRolState] = useState<Rol>(USUARIO_ACTUAL.rol);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Rol | null;
    if (stored && ROLES.some((r) => r.value === stored)) setRolState(stored);
    setHydrated(true);
  }, []);

  const value = useMemo<SessionValue>(
    () => ({
      usuario: { ...USUARIO_ACTUAL, rol },
      hydrated,
      setRol: (nuevo) => {
        setRolState(nuevo);
        window.localStorage.setItem(STORAGE_KEY, nuevo);
      },
    }),
    [rol, hydrated],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de SessionProvider");
  return ctx;
}
