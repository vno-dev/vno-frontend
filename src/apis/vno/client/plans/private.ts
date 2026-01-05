import { VnoCrudApiClient } from "../crud";
export class PrivatePlansApiClient extends VnoCrudApiClient<any> {
  constructor() {
    super({ resource: "plans" });
  }
}
