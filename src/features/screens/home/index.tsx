import React from "react";
import {
  HomeScreenActivities,
  HomeScreenChecklist,
  HomeScreenMainBoard,
  HomeScreenRecently,
} from "./components";
import { Main } from "@/components/layouts/main";

const HomePageScreen = () => {
  return (
    <Main className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 space-y-10">
        <HomeScreenMainBoard />
        <HomeScreenRecently />
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-10">
        <HomeScreenChecklist />
        <HomeScreenActivities />
      </div>
    </Main>
  );
};

export default HomePageScreen;
