import { BaseRecord } from "@/apis/base";

export interface IUser extends BaseRecord {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}
