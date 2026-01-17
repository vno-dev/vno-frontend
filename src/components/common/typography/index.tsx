import { cn } from "@/lib/utils";
import React from "react";

type Variant =
    | "heading"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "list"
    | "inline-code"
    | "lead"
    | "large"
    | "small"
    | "muted";

type TypographyOwnProps<C extends React.ElementType> = {
    as?: C;
    variant?: Variant;
    className?: string;
    children?: React.ReactNode;
};

type TypographyProps<C extends React.ElementType> = TypographyOwnProps<C> &
    Omit<React.ComponentPropsWithoutRef<C>, keyof TypographyOwnProps<C>>;

const variantClasses: Record<Variant, string> = {
    heading: "text-5xl md:text-[88px] font-bold tracking-tighter leading-[1.05] mb-8",
    h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "text-3xl font-semibold tracking-tight first:mt-0",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    list: "my-6 ml-6 list-disc [&>li]:mt-2",
    "inline-code":
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
};

export function Typography<C extends React.ElementType = "p">(
    props: TypographyProps<C>
) {
    const { as, variant = "p", className, children, ...rest } = props;

    const Component = as ?? ("p" as any);

    return (
        <Component className={cn(variantClasses[variant], className)} {...rest}>
            {children}
        </Component>
    );
}
