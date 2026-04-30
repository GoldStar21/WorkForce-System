"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasToken = document.cookie.includes("isLoggedIn=true");
    if (!hasToken) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  return { isChecking };
}