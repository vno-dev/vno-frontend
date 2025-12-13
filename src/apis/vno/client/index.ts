import { AuthApiClient } from "./auth";
import { OrganizerApiClient } from "./organizers";
import { PagesApiClient } from "./page";
import { WorkspacesApiClient } from "./workspace";

class ApiClient {
  auth = new AuthApiClient();
  organizers = new OrganizerApiClient();
  workspaces = new WorkspacesApiClient();
  pages = new PagesApiClient()
}

export const apiClient = new ApiClient();
