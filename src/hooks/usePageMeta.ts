"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useMessages } from "next-intl";

export function usePageMeta() {
  const pathname = usePathname();
  const locale = useLocale();
  const messages = useMessages() as any;

  useEffect(() => {
    const pathKey = getRouteKey(pathname);
    const meta = messages?.metadata?.[pathKey];

    if (!meta) return;

    if (meta.title) {
      document.title = meta.title;
    }

    const metaDescription = document.querySelector("meta[name='description']");
    if (meta.description) {
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

// 轉換 pathname 成 metadata key
function getRouteKey(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts[1] || "home";
}
