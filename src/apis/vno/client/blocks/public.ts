import { BaseRequest, BaseResponse } from "@/apis/base";
import { IBlock } from "../../interfaces";
import { VnoPublicCrudApiClient } from "../public-crud";
export class PublicBlocksApiClient extends VnoPublicCrudApiClient<IBlock> {
    constructor() {
        super({ resource: "blocks" });
    }

    getBlocks(request: BaseRequest): Promise<BaseResponse<IBlock>> {
        return this.client.get("", { params: request.params });
    }
}
