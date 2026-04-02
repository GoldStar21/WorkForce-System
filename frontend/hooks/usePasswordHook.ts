import { setPasswordService } from "@/lib/services/auth_service";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const usePasswodHook = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
     console.log("token:", token);
  console.log("password:", password);
  console.log("confirmPassword:", confirmPassword);

    // Provjera da li se pass podudara
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { duration: 4000 });
      return;
    }
console.log("sending request...");
    try {
        await setPasswordService({ token, password});
        toast.success("Great", { duration: 4000 });
         router.push("/");
    } catch {
        toast.error("Passwords do not match!", { duration: 4000 });
    }
  };

   return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
  };
};
