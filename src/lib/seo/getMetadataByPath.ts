// lib/seo/getMetadataByPath.ts
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function getMetadataByPath(pageKey: string): Promise<Metadata> {
  const messages = await getMessages();

  const meta = messages?.[pageKey];

  if (!meta || !meta.title || !meta.description) {
    return {
      title: "致一冷凍空調 Zhiyi Co.",
      description: "致一冷凍空調是一家專業的冷凍空調系統規劃事務所。",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
  };
}
