import NotesCreateScreen from "@/features/screens/notes-create";
import { Metadata } from "next";
import React from "react";
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Tạo ghi chú",
  };
};

const CreateNotePage = () => {
  return <NotesCreateScreen />;
};

export default CreateNotePage;
