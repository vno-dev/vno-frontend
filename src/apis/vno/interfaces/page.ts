import { BaseRecord } from "@/apis/base";

export interface IPage extends BaseRecord {
    organizationId: string;
    title:          string;
    iconEmoji:      string;
    coverUrl:       null;
    path:           string;
    visibility:     string;
    isLocked:       boolean;
    deletedAt:      null;
}