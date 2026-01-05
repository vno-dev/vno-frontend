"use client";
import { HeroGeometric } from "@/components/decoraters/background/shape";
import React, { useEffect } from "react";

const ErrorBoundary = ({
    error,
}: {
    error: Error & { digest?: string; statusCode?: number; message?: string };
    reset: () => void;
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <HeroGeometric
            badge="VNO"
            title1={"500"}
            title2={error.name}
            description={error.message}
        />
    );
};

export default ErrorBoundary;
