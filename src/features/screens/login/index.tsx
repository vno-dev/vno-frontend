"use client";

import { signIn } from "next-auth/react";
import SignInForm from "@/forms/sign-in";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

type LoginScreenProps = object;

const LoginScreen: FC<LoginScreenProps> = () => {
  const searchParams = useSearchParams();

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: async (val: Record<string, string>) => {
      const res = await signIn("password", { redirect: false, ...val });
      console.log("🚀 ~ LoginScreen ~ res:", res);
      if (res?.error) throw new Error("Email hoặc mật khẩu không chính xác");
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      window.location.replace(searchParams.get("redirect") || "/");
    },
  });

  return <SignInForm onSubmit={handleSubmit as never} />;
};

export default LoginScreen;
