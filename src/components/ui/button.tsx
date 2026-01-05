"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-85 ease-in-out duration-300 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        none: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

type PolymorphicComponentProp<C extends React.ElementType> = {
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<C> &
  VariantProps<typeof buttonVariants> & {
    ripple?: boolean;
    isLoading?: boolean;
  };

type ButtonProps<C extends React.ElementType = "button"> =
  PolymorphicComponentProp<C>;

function Button<C extends React.ElementType = "button">({
  className,
  variant,
  size,
  asChild = false,
  ripple = true,
  isLoading = false,
  ...props
}: ButtonProps<C>) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const rippleIdRef = React.useRef(0);

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    if (!ripple) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: rippleIdRef.current++,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative overflow-hidden"
      )}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        createRipple(e);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Spinner className="mr-2 animate-spin" />}
      {props.children}
      {ripple && (
        <span className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className="absolute rounded-full bg-white/30"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </AnimatePresence>
        </span>
      )}
    </Component>
  );
}

export { Button, buttonVariants };
