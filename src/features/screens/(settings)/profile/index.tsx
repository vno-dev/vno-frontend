"use client";
import { ContentSection } from "@/components/containers";
import { ProfileForm } from "@/forms";
import React from "react";

const ProfileScreen = () => {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <ProfileForm />
    </ContentSection>
  );
};

export default ProfileScreen;
