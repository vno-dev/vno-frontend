'use client'
import { ContentSection } from "@/components/containers";
import { NotificationsForm } from "@/forms";
import React from "react";

const NotificationsScreen = () => {
  return (
    <ContentSection
      title="Notifications"
      desc="Configure how you receive notifications."
    >
      <NotificationsForm />
    </ContentSection>
  );
};

export default NotificationsScreen;
