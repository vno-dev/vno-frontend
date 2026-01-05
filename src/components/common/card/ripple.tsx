"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


type PolymorphicProps<C extends React.ElementType> = {
  asChild?: boolean;
  className?: string;
  ripple?: boolean;
  scaleOnClick?: boolean;
  duration?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
} & React.ComponentPropsWithoutRef<C>;

function CardActionRipple<C extends React.ElementType = "div">({
  asChild = false,
  className,
  ripple = true,
  scaleOnClick = true,
  duration = "600ms",
  onClick,
  ...props
}: PolymorphicProps<C>) {
  const [buttonRipples, setButtonRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event);
    onClick?.(event);
  };

  const Component = asChild ? Slot : "div";

  useEffect(() => {
    if (buttonRipples.length > 0) {
      const lastRipple = buttonRipples[buttonRipples.length - 1];
      const timeout = setTimeout(() => {
        setButtonRipples((prevRipples) =>
          prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
        );
      }, parseInt(duration));
      return () => clearTimeout(timeout);
    }
  }, [buttonRipples, duration]);

  return (
    <Component
      className={cn(
        "relative overflow-hidden inline-block cursor-pointer",
        {
          "active:scale-95 transition-all duration-150 ease-initial":
            scaleOnClick,
        },
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {props.children}

      {ripple && (
        <span className="pointer-events-none absolute inset-0 z-20">
          {buttonRipples.map((ripple) => (
            <span
              className="animate-rippling bg-accent-foreground/20 absolute rounded-full"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                transform: `scale(0)`,
              }}
            />
          ))}
        </span>
      )}
    </Component>
  );
}

export { CardActionRipple };
