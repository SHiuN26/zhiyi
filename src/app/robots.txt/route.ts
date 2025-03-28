import { NextResponse } from "next/server";

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://zhiyi-official.vercel.app/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
