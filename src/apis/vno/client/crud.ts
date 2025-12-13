import { BaseCrudApiClient, BaseRecord } from "@/apis/base";
import { VNO_API_URL } from "@/config/env";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export interface IVnoCrudApiClientOptions {
  resource: string;
}

if (typeof window !== "undefined" && !window.__NEXTAUTH_SESSION__) {
  window.__NEXTAUTH_SESSION__ = getSession();
}

const customGetSession = async (): Promise<Session | null> => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.__NEXTAUTH_SESSION__ || null;
};

export class VnoCrudApiClient<
  T extends BaseRecord = BaseRecord
> extends BaseCrudApiClient<T> {
  constructor({ resource }: IVnoCrudApiClientOptions) {
    const baseUrl =
      typeof window === "undefined"
        ? `${VNO_API_URL}/api/${resource}`
        : `${window.location.origin}/vno-api/v1/${resource}`;
    super({ baseUrl });
    this.client.interceptors.request.use(async (config) => {
      const session = await customGetSession();
      if (session) {
        config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
      return config;
    });
  }
}
