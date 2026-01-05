import { VnoCrudApiClient } from "./crud";
import { IOrganizer, IPlanResponse } from "../interfaces";
import { BaseResponse } from "@/apis/base";
export class OrganizerApiClient extends VnoCrudApiClient<IOrganizer> {
  constructor() {
    super({ resource: "orgs" });
  }

  getCurrent(): Promise<BaseResponse<IOrganizer>> {
    return this.client.get("/current");
  }

  getCurrentPlan: () => Promise<BaseResponse<IPlanResponse>> = () => {
    return this.client.get("/current/plan-info");
  };
}
