import { BaseRecord } from "@/apis/base";

export interface IWorkspace extends BaseRecord {
  organizationId: string;
  name: string;
  iconEmoji: string;
  coverUrl: string;
  defaultPermission: string;
  isSystem: boolean;
  createdAt: string;
  deletedAt: string;
  deletable: boolean;
}
