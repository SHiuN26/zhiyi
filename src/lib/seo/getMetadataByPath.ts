// lib/seo/getMetadataByPath.ts
import { getMessages } from "next-intl/server";

export async function getMetadataByPath(pathKey: string) {
  const messages = await getMessages();

  const meta = messages?.metadata?.[pathKey];

  if (!meta) {
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
