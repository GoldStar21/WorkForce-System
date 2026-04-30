"use client";
import { useAuth } from "@/hooks/useAuthHook";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isChecking } = useAuth();

  if (isChecking) return null; // Ne prikazuj ništa dok se provjerava

  return <>{children}</>;
}