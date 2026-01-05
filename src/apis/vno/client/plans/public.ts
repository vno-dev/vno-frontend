import { VnoPublicCrudApiClient } from "../public-crud";
export class PublicPlansApiClient extends VnoPublicCrudApiClient<any> {
  constructor() {
    super({ resource: "plans" });
  }
}
