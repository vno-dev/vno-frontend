import { VnoCrudApiClient } from "./crud";
import { IPage } from "../interfaces";
export class PagesApiClient extends VnoCrudApiClient<IPage> {
  constructor() {
    super({ resource: "pages" });
  }
}
