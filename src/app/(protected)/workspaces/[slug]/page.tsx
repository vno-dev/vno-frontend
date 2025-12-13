import WorkspaceScreen from "@/features/screens/workspace";
import React from "react";

interface WorkSpacePageProps {
  params: Promise<{
    slug: string;
  }>;
}
const WorkSpacePage = async ({ params }: WorkSpacePageProps) => {
  const slug = (await params).slug;
  return <WorkspaceScreen slug={slug} />;
};

export default WorkSpacePage;
