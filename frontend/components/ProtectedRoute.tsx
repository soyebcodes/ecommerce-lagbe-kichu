"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role!))) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, role, router, allowedRoles, redirectTo]);

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role!))) {
    return null; // prevent redirect
  }

  return <>{children}</>;
}
