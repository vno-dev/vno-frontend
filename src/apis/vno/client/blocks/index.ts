import { PrivateBlocksApiClient } from "./private";
import { PublicBlocksApiClient } from "./public";

export class BlocksApiClient {
    public public = new PublicBlocksApiClient();
    public private = new PrivateBlocksApiClient();
}
