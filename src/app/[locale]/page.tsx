import { useTranslations } from "next-intl";
import PageAnimatedWrapper from "@/components/PageAnimatedWrapper";
export default function Home() {
  const t = useTranslations("home");
  return (
    <PageAnimatedWrapper>
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-600">
          {t("headline")}
        </h1>
        <p className="text-lg md:text-xl">{t("description")}</p>
      </div>
    </PageAnimatedWrapper>
  );
}
