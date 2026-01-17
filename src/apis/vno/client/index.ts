import { AuthApiClient } from "./auth";
import { BlocksApiClient } from "./blocks";
import { OrganizerApiClient } from "./organizers";
import { PagesApiClient } from "./page";
import { PlansApiClient } from "./plans";
import { WorkspacesApiClient } from "./workspace";

class ApiClient {
    auth = new AuthApiClient();
    organizers = new OrganizerApiClient();
    workspaces = new WorkspacesApiClient();
    pages = new PagesApiClient();
    blocks = new BlocksApiClient();
    plans = new PlansApiClient();
}

export const apiClient = new ApiClient();
