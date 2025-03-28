"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useMessages } from "next-intl";

// 定義每個 metadata 結構
type PageMetadata = {
  title: string;
  description: string;
};

// 定義整份 messages 結構
type Messages = {
  metadata?: Record<string, PageMetadata>;
};

export function usePageMeta() {
  const pathname = usePathname();
  const locale = useLocale();
  const messages = useMessages() as Messages;

  useEffect(() => {
    if (!messages?.metadata) return;

    const pathKey = getRouteKey(pathname);
    const meta = messages.metadata[pathKey];

    if (meta?.title) {
      document.title = meta.title;
    }

    const metaDescription = document.querySelector("meta[name='description']");
    if (meta?.description) {
      if (metaDescription) {
        metaDescription.setAttribute("content", meta.description);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = meta.description;
        document.head.appendChild(newMeta);
      }
    }
  }, [pathname, locale, messages]);
}

// 自動解析路由 key，ex: /zh/about → about
function getRouteKey(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts[1] || "home";
}
