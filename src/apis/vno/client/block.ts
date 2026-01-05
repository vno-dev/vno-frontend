import { VnoCrudApiClient } from "./crud";
import { IBlock } from "../interfaces";
import { BaseRequest, BaseResponse } from "@/apis/base";
export class BlocksApiClient extends VnoCrudApiClient<IBlock> {
  constructor() {
    super({ resource: "blocks" });
  }

  getBlocks(request: BaseRequest): Promise<BaseResponse<IBlock>> {
      return this.client.get("", { params: request.params });
    }
}
