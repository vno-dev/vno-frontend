import { BaseRecord } from "@/apis/base";

export interface IOrganizer extends BaseRecord {
  name: string;
  slug: string;
  plan: string;
  createdAt: string;
}

export interface IPlanResponse {
  availablePlans: AvailablePlan[];
  currentPlan: string;
  upgradeUrl: string;
}

export interface AvailablePlan {
  plan: string;
  name: string;
  description: string;
  monthlyPriceCents: number;
  priceFormatted: string;
  features: Feature[];
  isRecommended: boolean;
}

export interface Feature {
  name: string;
  value: string;
  highlighted: boolean;
}
