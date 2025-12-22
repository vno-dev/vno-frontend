import AnimatedContent from "@/components/animates/animate-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GridIcon } from "lucide-react";
const HomeScreenOverviewUser = () => {
  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={true}
      duration={1.2}
      ease="bounce.out"
      animateOpacity
      threshold={0.2}
      delay={0.3}
    >
      <div className="flex items-center justify-between">
        <Avatar className="size-10 border border-neutral-300">
          <AvatarImage src={"/images/avatars/user1.svg"} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant={"ghost"} className="rounded-full" size={"icon"}>
          <GridIcon className="size-6" />
        </Button>
      </div>
    </AnimatedContent>
  );
};

export default HomeScreenOverviewUser;
