import { BaseRecord } from "@/apis/base";

export interface IOrganizer extends BaseRecord {
  name: string;
  slug: string;
  plan: string;
  createdAt: string;
}
