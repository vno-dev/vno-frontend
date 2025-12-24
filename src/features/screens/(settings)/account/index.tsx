"use client";

import { ContentSection } from "@/components/containers";
import { AccountForm } from "@/forms";

const AccountScreen = () => {
  return (
    <ContentSection
      title="Account"
      desc="Update your account settings. Set your preferred language and
          timezone."
    >
      <AccountForm />
    </ContentSection>
  );
};

export default AccountScreen;
