import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`@/messages/${locale}/nav.json`)).default,
      ...(await import(`@/messages/${locale}/about.json`)).default,
      ...(await import(`@/messages/${locale}/home.json`)).default,
      ...(await import(`@/messages/${locale}/cases.json`)).default,
      ...(await import(`@/messages/${locale}/services.json`)).default,
      ...(await import(`@/messages/${locale}/contact.json`)).default,
      ...(await import(`@/messages/${locale}/thank.json`)).default,
    },
  };
});
