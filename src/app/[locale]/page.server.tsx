import { getMetadataByPath } from "@/lib/seo/getMetadataByPath";

export async function generateMetadata() {
  return await getMetadataByPath("home");
}
