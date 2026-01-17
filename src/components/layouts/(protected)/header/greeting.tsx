"use client";

import { MoonStar, CloudSun } from "lucide-react";
import { cn } from "@/lib/utils";

interface GreetingProps {
  name?: string;
}

export function Greeting({ name = "VNO's User" }: GreetingProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 6) {
      return {
        text: "Hello",
        icon: MoonStar,
        bgColor: "bg-slate-900",
      };
    } else if (hour >= 6 && hour < 12) {
      return {
        text: "Good morning",
        icon: CloudSun,
        bgColor: "bg-yellow-400",
      };
    } else if (hour >= 12 && hour < 14) {
      return {
        text: "Good afternoon",
        icon: CloudSun,
        bgColor: "bg-yellow-400",
      };
    } else if (hour >= 14 && hour < 18) {
      return {
        text: "Good afternoon",
        icon: CloudSun,
        bgColor: "bg-yellow-400",
      };
    } else if (hour >= 18 && hour < 21) {
      return {
        text: "Good evening",
        icon: MoonStar,
        bgColor: "bg-slate-900",
      };
    } else {
      return {
        text: "Good evening",
        icon: MoonStar,
        bgColor: "bg-zinc-900",
      };
    }
  };

  const greeting = getGreeting();
  const Icon = greeting.icon;

  return (
    <div className="hidden lg:flex items-center gap-2">
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center text-white",
          greeting.bgColor
        )}
      >
        <Icon className="size-4" />
      </div>
      <p className="text-sm sm:text-lg font-medium">
        {greeting.text}, {name} 👋!
      </p>
    </div>
  );
}
