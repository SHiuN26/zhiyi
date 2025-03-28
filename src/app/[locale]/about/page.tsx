"use client";
import { useTranslations } from "next-intl";
import PageAnimatedWrapper from "@/components/PageAnimatedWrapper";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function AboutPage() {
  const t = useTranslations("about");
  usePageMeta();
  return (
    <PageAnimatedWrapper>
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-600">
          {t("title")}
        </h1>
        <p className="leading-relaxed md:text-lg">{t("content")}</p>
      </div>
    </PageAnimatedWrapper>
  );
}
