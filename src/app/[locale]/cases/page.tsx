import { useTranslations } from "next-intl";
import PageAnimatedWrapper from "@/components/PageAnimatedWrapper";

export default function CasesPage() {
  const t = useTranslations("cases");
  return (
    <PageAnimatedWrapper>
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-600">
          {t("title")}
        </h1>
        <p className="leading-relaxed md:text-lg">{t("note")}</p>
      </div>
    </PageAnimatedWrapper>
  );
}
