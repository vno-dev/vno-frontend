"use client";

import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";
import { ISignUpRequest } from "@/apis/vno";
import { useRouter } from "@/lib/navigation";
import SignUpForm from "@/forms/sign-up";

type SignUpScreenProps = object;

const SignUpScreen: FC<SignUpScreenProps> = () => {
  const searchParams = useSearchParams();
  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: async (val: ISignUpRequest["body"]) => {
      await signIn("password", {
        mode: "signup",
        redirect: false,
        ...val,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      toast.success("Tài khoản đã được tạo.");
      window.location.replace(searchParams.get("redirect") || "/");
    },
  });

  return <SignUpForm onSubmit={handleSubmit as never} />;
};

export default SignUpScreen;
