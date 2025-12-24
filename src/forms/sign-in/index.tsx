"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import {
  Mail,
  Lock,
  Palette,
  Users,
  Cloud,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { IconGmail, IconGithub } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParams } from "next/navigation";
import Beams from "@/components/animates/animate-backgrounds/beams";

const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email must be at least 5 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(50, "Password too long."),
  remember: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => Promise<void> | void;
  loading?: boolean;
}

export default function SignInForm({ onSubmit, loading }: SignInFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const searchParams = useSearchParams();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  const isLoading = loading ?? isSubmitting;
  const redirect = searchParams.get("redirect") || "/";

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center lg:p-4">
      <div className="z-10 w-full max-w-6xl">
        <div className="bg-card overflow-hidden lg:rounded-[40px] lg:shadow-2xl">
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
            <div className="flex flex-col justify-center p-4 md:p-12">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl uppercase">Welcome back</h2>
                  <p className="mt-2 text-sm text-stone-600">
                    Sign in to continue your creative journey
                  </p>
                </div>

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <FieldSet>
                    <FieldGroup>
                      {/* Email Field */}
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
                                className="autofill:bg-transparent"
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

                      {/* Password Field */}
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
                                placeholder="Enter your password"
                                className="autofill:!bg-white autofill:!text-black"
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

                      {/* Remember me */}
                      <Controller
                        name="remember"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center justify-between">
                            <Field
                              orientation="horizontal"
                              className="text-muted-foreground text-sm"
                            >
                              <Checkbox
                                id="remember-me"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <FieldLabel
                                className="font-normal"
                                htmlFor="remember-me"
                              >
                                Remember me
                              </FieldLabel>
                            </Field>

                            <Link
                              href="#"
                              className="text-primary whitespace-nowrap hover:text-primary/80 text-sm"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        )}
                      />

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        isLoading={isLoading}
                      >
                        {isLoading
                          ? "Signing in..."
                          : "Sign in to your account"}
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
                          <IconGmail className="size-5" />
                          <span className="ml-2">Google</span>
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          variant="secondary"
                          className="border-border rounded-lg border px-4 py-2.5 text-sm shadow-sm"
                        >
                          <IconGithub className="size-5" />
                          <span className="ml-2">GitHub</span>
                        </Button>
                      </div>
                    </FieldGroup>
                  </FieldSet>
                </form>

                <div className="text-muted-foreground mt-8 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={`/sign-up?redirect=${redirect}`}
                    className="text-primary hover:text-primary/80"
                  >
                    Sign up for free
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
