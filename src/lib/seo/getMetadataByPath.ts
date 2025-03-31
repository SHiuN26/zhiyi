// lib/seo/getMetadataByPath.ts
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function getMetadataByPath(pathKey: string): Promise<Metadata> {
  const messages = await getMessages();

  const meta = messages?.[pathKey];

  if (!meta || !meta.title || !meta.description) {
    return {
      title: "致一冷凍空調 Zhiyi Co.",
      description: "致一冷凍空調是一家專業的冷凍空調系統規劃事務所。",
    };
  }

  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}
