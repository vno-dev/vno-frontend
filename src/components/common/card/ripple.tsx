"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

type PolymorphicProps<C extends React.ElementType> = {
  as?: C;
  asChild?: boolean;
  className?: string;
  ripple?: boolean;
  scaleOnClick?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & React.ComponentPropsWithoutRef<C>;

function CardActionRipple<C extends React.ElementType = "div">({
  as,
  asChild = false,
  className,
  ripple = true,
  scaleOnClick = true,
  onClick,
  ...props
}: PolymorphicProps<C>) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const rippleIdRef = React.useRef(0);
  const [isScaling, setIsScaling] = React.useState(false);

  const Component = asChild ? Slot : as || "div";

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (ripple) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple: Ripple = { x, y, size, id: rippleIdRef.current++ };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    }

    if (scaleOnClick) {
      setIsScaling(true);
      setTimeout(() => setIsScaling(false), 150);
    }

    onClick?.(e);
  };

  return (
    <Component
      className={cn(
        "relative overflow-hidden inline-block",
        scaleOnClick && "transition-transform duration-150",
        isScaling && "scale-95",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {props.children}
      {ripple && (
        <span className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {ripples.map((r) => (
              <motion.span
                key={r.id}
                className="absolute rounded-full bg-white/30"
                style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ))}
          </AnimatePresence>
        </span>
      )}
    </Component>
  );
}

export { CardActionRipple };
