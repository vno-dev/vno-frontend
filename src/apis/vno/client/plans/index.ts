import { PrivatePlansApiClient } from "./private";
import { PublicPlansApiClient } from "./public";

export class PlansApiClient {
  public public = new PublicPlansApiClient();
  public private = new PrivatePlansApiClient();
}
