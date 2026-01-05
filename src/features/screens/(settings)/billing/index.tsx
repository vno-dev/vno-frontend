"use client";
import { apiClient } from "@/apis/vno";
import { Typography } from "@/components/common/typography";
import { ContentSection } from "@/components/containers";
import { VNOLogo } from "@/components/icons";
import { QueryObjectWrapper } from "@/components/query-data";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import NumberFlow from "@number-flow/react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const BillingScreen = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["billing"],
    queryFn: () => apiClient.organizers.getCurrentPlan(),
  });
  return (
    <ContentSection
      title="Billing"
      desc="Manage your billing information and payment methods."
    >
      <QueryObjectWrapper data={data} isLoading={isLoading}>
        {(planData) => {
          const current = data?.data?.currentPlan;
          const fullPlan = data?.data.availablePlans.find(
            (plan) => plan.plan === current
          );
          return (
            <div className="rounded-md border shadow-xs p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Typography variant="h4" className="flex items-center gap-1">
                  <VNOLogo className="size-6" />
                  <span>Plan</span>
                </Typography>
                <Badge variant="secondary" className="rounded-full">
                  VNO {current}
                </Badge>
              </div>
              <div className="flex flex-col items-stretch justify-start gap-1 flex-initial">
                <p className="text-xs text-foreground">Price/month</p>
                <p className="text-sm leading-[20px] font-medium">
                  <NumberFlow
                    value={fullPlan?.monthlyPriceCents || 0}
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                  />
                </p>
              </div>
              <hr className="-mx-4" />
              <div className="text-sm text-foreground flex items-center gap-1 flex-initial">
                Learn more by visiting VNO&apos;s{" "}
                <Link
                  href="/pricing"
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "!p-0 text-blue-500"
                  )}
                >
                  pricing page.
                  <ExternalLink className="size-4" />
                </Link>
              </div>
            </div>
          );
        }}
      </QueryObjectWrapper>
    </ContentSection>
  );
};

export default BillingScreen;
