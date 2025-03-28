import "@/app/globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "致一冷凍空調 Zhenyi Co.",
  description:
    "致一專注於大型冷凍空調設計與工程，提供專業節能的空調系統整合解決方案。",
};

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-6 h-6 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  if (!messages) notFound();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className="h-full">
      <body className="flex flex-col min-h-screen antialiased bg-white text-gray-800 ">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
