"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import {
  Mail,
  Lock,
  Users,
  Eye,
  EyeOff,
  Palette,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Google, Github } from "@/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParams, useRouter } from "next/navigation";
import Beams from "@/components/animates/animate-backgrounds/beams";

// --- Signup schema ---
const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name too long."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email must be at least 5 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(50, "Password too long."),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => Promise<void> | void;
  loading?: boolean;
}

export default function SignUpForm({ onSubmit, loading }: SignUpFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
    // redirect after successful signup
    const redirect = searchParams.get("redirect") || "/";
    router.replace(redirect);
  });

  const isLoading = loading ?? isSubmitting;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center lg:p-4">
      <div className="z-10 w-full max-w-6xl">
        <div className="bg-background overflow-hidden lg:rounded-[40px] lg:shadow-2xl">
          <div className="grid min-h-[700px] lg:grid-cols-2">
            {/* --- Left Side --- */}
            <div className="hidden lg:flex relative m-2 lg:m-4 rounded-3xl overflow-hidden p-6 lg:p-12 text-white">
              <div className="absolute inset-0 z-0">
                <Beams
                  beamWidth={2}
                  beamHeight={15}
                  beamNumber={12}
                  lightColor="#ffffff"
                  speed={2}
                  noiseIntensity={1.75}
                  scale={0.2}
                  rotation={0}
                />
              </div>
              <div className="z-[1]">
                <div className="mb-4 lg:mb-12 text-sm lg:text-lg font-semibold uppercase">
                  VNO Studio
                </div>
                <h1 className="mb-4 text-4xl lg:text-6xl font-medium">
                  Create, Design, and Innovate
                </h1>
                <p className="mb-4 lg:mb-12 text-base lg:text-xl opacity-80">
                  Join thousands of creators who trust VNO Studio to bring their
                  vision to life.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Palette size={16} />,
                      title: "Smart Notes",
                      desc: "Create, organize, and search notes effortlessly in one place.",
                    },
                    {
                      icon: <Users size={16} />,
                      title: "Real-time Collaboration",
                      desc: "Work together seamlessly with your team in real time.",
                    },
                    {
                      icon: <Cloud size={16} />,
                      title: "All-in-one Workspace",
                      desc: "Manage docs, tasks, and wikis — everything your team needs.",
                    },
                    {
                      icon: <ShieldCheck size={16} />,
                      title: "Secure & Private",
                      desc: "Your data stays encrypted and protected at every step.",
                    },
                  ].map(({ icon, title, desc }, i) => (
                    <div
                      key={i}
                      className="feature-item animate-fadeInUp flex items-center"
                      style={{ animationDelay: `${0.2 * (i + 1)}s` }}
                    >
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                        {icon}
                      </div>
                      <div>
                        <div className="text-sm lg:text-base font-semibold">
                          {title}
                        </div>
                        <div className="text-sm lg:text-sm opacity-70">
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Right Side --- */}
            <div className="flex flex-col justify-center p-12">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl uppercase">Sign Up</h2>
                  <p className="mt-2 text-sm text-stone-600">
                    Create an account to start using VNO Studio
                  </p>
                </div>

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <FieldSet>
                    <FieldGroup>
                      {/* Full Name */}
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="fullName">
                              Full Name
                            </FieldLabel>
                            <InputGroup className="h-10 border-border bg-input">
                              <InputGroupInput
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                aria-invalid={fieldState.invalid}
                                {...field}
                              />
                              <InputGroupAddon>
                                <Users className="h-5 w-5 text-gray-400" />
                              </InputGroupAddon>
                            </InputGroup>
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Email */}
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <InputGroup className="h-10 border-border bg-input">
                              <InputGroupInput
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                aria-invalid={fieldState.invalid}
                                {...field}
                              />
                              <InputGroupAddon>
                                <Mail className="h-5 w-5 text-gray-400" />
                              </InputGroupAddon>
                            </InputGroup>
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Password */}
                      <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <InputGroup className="h-10 border-border bg-input">
                              <InputGroupInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                aria-invalid={fieldState.invalid}
                                {...field}
                              />
                              <InputGroupAddon>
                                <Lock className="h-5 w-5 text-gray-400" />
                              </InputGroupAddon>
                              <InputGroupAddon align="inline-end">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <InputGroupButton
                                      variant="ghost"
                                      aria-label="Toggle password visibility"
                                      size="icon-xs"
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      {showPassword ? (
                                        <Eye size={16} />
                                      ) : (
                                        <EyeOff size={16} />
                                      )}
                                    </InputGroupButton>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {showPassword
                                        ? "Hide password"
                                        : "Show password"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </InputGroupAddon>
                            </InputGroup>
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        isLoading={isLoading}
                      >
                        {isLoading ? "Signing up..." : "Sign up"}
                      </Button>

                      {/* OAuth Divider */}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <hr className="border-border flex-1" />
                        <span className="relative px-2">Or continue with</span>
                        <hr className="border-border flex-1" />
                      </div>

                      {/* OAuth Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          size="lg"
                          variant="secondary"
                          className="border-border rounded-lg border px-4 py-2.5 text-sm shadow-sm"
                        >
                          <Google className="size-5" />
                          <span className="ml-2">Google</span>
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          variant="secondary"
                          className="border-border rounded-lg border px-4 py-2.5 text-sm shadow-sm"
                        >
                          <Github className="size-5" />
                          <span className="ml-2">GitHub</span>
                        </Button>
                      </div>
                    </FieldGroup>
                  </FieldSet>
                </form>

                <div className="text-muted-foreground mt-8 text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href={`/login?redirect=${
                      searchParams.get("redirect") || "/"
                    }`}
                    className="text-primary hover:text-primary/80"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
