"use client";
import { apiClient } from "@/apis/vno";
import { CONST_REVALIDATE_TAGS } from "@/const";
import { AppTopbar } from "@/lib/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Loader } from "@/icons";
import React from "react";

const CategoryPage = () => {
  const t = useTranslations("HomePage");
  const { data, isLoading } = useQuery({
    queryKey: [CONST_REVALIDATE_TAGS.CATEGORIES],
    queryFn: async () => apiClient.categoris.getAll({}),
  });

  if (isLoading) {
    return <Loader className="w-8 h-8" />
  }
  if (!data) {
    return null;
  }

  return (
    <>
      <AppTopbar title="Category" />
      <h1>{t("title")}</h1>
      <div className="flex flex-col gap-2">{JSON.stringify(data, null, 2)}</div>
    </>
  );
};

export default CategoryPage;
