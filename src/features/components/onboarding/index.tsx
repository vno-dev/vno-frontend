"use client";
import { useRouter } from "@/lib/navigation";
import { useOnboardingStore } from "@/stores/onboarding";
import { useEffect } from "react";
import OnBoardingBody from "./body";
import OnBoardingBottom from "./bottom-actions";
import OnBoardingTopBar from "./top-bar";

const OnBoardingScreen = () => {
    const router = useRouter();
    const { isOpen, skip } = useOnboardingStore();

    useEffect(() => {
        if (!isOpen) {
            skip();
            router.push("/");
        }
    }, [isOpen, skip]);

    if (!isOpen) return null;

    return (
        <div className=" max-w-lg mx-auto h-dvh flex flex-col">
            <OnBoardingTopBar />
            <OnBoardingBody />
            <OnBoardingBottom />
        </div>
    );
};

export default OnBoardingScreen;
