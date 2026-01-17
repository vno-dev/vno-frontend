import { BaseRequest, BaseResponse } from "@/apis/base";
import { IBlock } from "../../interfaces";
import { VnoCrudApiClient } from "../crud";
export class PrivateBlocksApiClient extends VnoCrudApiClient<IBlock> {
    constructor() {
        super({ resource: "blocks" });
    }

    getBlocks(request: BaseRequest): Promise<BaseResponse<IBlock>> {
        return this.client.get("", { params: request.params });
    }
}
