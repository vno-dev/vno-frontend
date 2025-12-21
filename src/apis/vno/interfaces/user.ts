import { BaseRecord } from "@/apis/base";

export interface IUser extends BaseRecord {
  name: string;
  email: string;
  currentOrgId: string;
  currentRole: Array<any>;
  avatarUrl: string;
}
