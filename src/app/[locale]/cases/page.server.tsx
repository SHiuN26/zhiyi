import { getMetadataByPath } from "@/lib/seo/getMetadataByPath";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataByPath("cases");
}
