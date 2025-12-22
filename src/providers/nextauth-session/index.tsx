"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
type SessionProviderProps = PropsWithChildren;

const AppSessionProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AppSessionProvider;
