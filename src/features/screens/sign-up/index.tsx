"use client";

import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";
import { apiClient, ISignUpRequest } from "@/apis/vno";
import { useRouter } from "@/lib/navigation";
import SignUpForm from "@/forms/sign-up";

type SignUpScreenProps = object;

const SignUpScreen: FC<SignUpScreenProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: async (val: ISignUpRequest["body"]) => {
      await apiClient.auth.signUp({ body: val });
      await signIn("password", { redirect: false, ...val });
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      router.replace(searchParams.get("redirect") || "/");
    },
  });

  return <SignUpForm onSubmit={handleSubmit as never} />;
};

export default SignUpScreen;
