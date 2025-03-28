"use client";

import PageAnimatedWrapper from "@/components/PageAnimatedWrapper";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ThankPage() {
  const t = useTranslations("thank");
  const locale = useLocale();
  usePageMeta();
  return (
    <PageAnimatedWrapper>
      <div className="max-w-xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold text-sky-600">{t("title")}</h1>
        <p>{t("message")}</p>
        <Link
          href={`/${locale}`}
          className="text-sky-600 underline inline-block mt-4"
        >
          {t("back")}
        </Link>
      </div>
    </PageAnimatedWrapper>
  );
}
