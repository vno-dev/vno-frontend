import { Button } from "@/components/ui/button";

const OnboardingScreenBottom = () => {
    return (
        <div className="flex items-center gap-4 p-4">
            <Button
                size={"lg"}
                className="rounded-full flex-1 h-[56px] font-semibold"


            >
                Log in
            </Button>
            <Button
                size={"lg"}
                variant={"secondary"}
                className="rounded-full flex-1 h-[56px] font-semibold"

            >
                Register
            </Button>
        </div>
    );
};

export default OnboardingScreenBottom;
