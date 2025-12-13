import { VnoCrudApiClient } from "./crud";
import { IWorkspace } from "../interfaces";
export class WorkspacesApiClient extends VnoCrudApiClient<IWorkspace> {
  constructor() {
    super({ resource: "workspaces" });
  }
}
