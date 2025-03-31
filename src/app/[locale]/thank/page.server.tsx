import { getMetadataByPath } from "@/lib/seo/getMetadataByPath";
import { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata = await getMetadataByPath("thank");
  const locale = params.locale;

  return {
    title: metadata.title[locale],
    description: metadata.description[locale],
  };
}
