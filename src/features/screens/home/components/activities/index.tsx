import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeadingSection } from "@/features/components";
import { formatDate } from "date-fns";
import React from "react";

const sampleData = [
  {
    id: "activity-1",
    name: "Maya Hayes",
    avatar: "/images/avatars/user1.svg",
    action: "Design challenges",
    date: "2021-04-27",
  },
  {
    id: "activity-2",
    name: "Cassie Melendez",
    avatar: "/images/avatars/user2.svg",
    action: "Note B – Dribbble strategy",
    date: "2021-04-27",
  },
  {
    id: "activity-3",
    name: "Ronny Schultz",
    avatar: "/images/avatars/user3.svg",
    action: "Note B – Dribbble strategy",
    date: "2021-04-27",
  },
  {
    id: "activity-4",
    name: "Amanda Finnegan",
    avatar: "/images/avatars/user4.svg",
    action: "Meeting planning",
    date: "2021-04-27",
  },
  {
    id: "activity-5",
    name: "Rob Houghton",
    avatar: "/images/avatars/user5.svgrafce ",
    action: "Plans for future and other directions, what needs to be done",
    date: "2021-04-27",
  },
];

const HomeScreenActivities = () => {
  return (
    <div>
      <HeadingSection title="Activities">
        <ul className="space-y-5 bg-card p-4 rounded-lg border border-border">
          {sampleData.map((a) => (
            <li key={a.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={a.avatar} alt={a.name} />
                  <AvatarFallback>
                    <span className="text-xs">{a.name[0]}</span>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-foreground">
                    {a.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {a.action}
                  </p>
                </div>
              </div>
              <span className="text-xs whitespace-nowrap text-muted-foreground">
                {formatDate(a.date, "PPP")}
              </span>
            </li>
          ))}
        </ul>
      </HeadingSection>
    </div>
  );
};

export default HomeScreenActivities;
