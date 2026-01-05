import { BaseCrudApiClient, BaseRecord } from "@/apis/base";
import { VNO_API_URL } from "@/config/env";

export interface IVnoPublicCrudApiClientOptions {
  resource: string;
}

export class VnoPublicCrudApiClient<
  T extends BaseRecord = BaseRecord
> extends BaseCrudApiClient<T> {
  constructor({ resource }: IVnoPublicCrudApiClientOptions) {
    const baseUrl =
      typeof window === "undefined"
        ? `${VNO_API_URL}/api/v1/${resource}`
        : `${window.location.origin}/vno-api/v1/${resource}`;
    super({ baseUrl });
    this.client.interceptors.request.use(async (config) => {
      return config;
    });
  }
}
