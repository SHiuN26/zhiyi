import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://zhiyi-official.vercel.app";

const staticPages = ["home", "about", "services", "cases", "contact", "thank"];

export async function GET() {
  const urls = routing.locales.flatMap((locale) =>
    staticPages.map((page) => {
      const path = page === "home" ? "" : `/${page}`;
      return `<url>
        <loc>${BASE_URL}/${locale}${path}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`;
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
