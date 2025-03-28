"use client";
import { useTranslations } from "next-intl";
import PageAnimatedWrapper from "@/components/PageAnimatedWrapper";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ServicesPage() {
  const t = useTranslations("services");
  const items: string[] = t.raw("items");
  usePageMeta();
  return (
    <PageAnimatedWrapper>
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-600">
          {t("title")}
        </h1>
        <ul className="list-disc pl-6 space-y-1 md:text-lg">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </PageAnimatedWrapper>
  );
}
