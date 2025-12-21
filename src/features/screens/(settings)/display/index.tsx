"use client";
import { ContentSection } from "@/components/containers";
import { DisplayForm } from "@/forms";
import React from "react";

const DisplayScreen = () => {
  return (
    <ContentSection
      title="Display"
      desc="Turn items on or off to control what's displayed in the app."
    >
      <DisplayForm />
    </ContentSection>
  );
};

export default DisplayScreen;
