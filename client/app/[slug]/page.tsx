``
import { draftMode } from "next/headers";
import { BlockRenderer } from "@/components/block-renderer";
import { getAllPagesSlugs, getPageBySlug } from "@/features/static/service";
import DefaultLayout from "@/components/layout";

export async function generateStaticParams() {
  const pages = await getAllPagesSlugs();
  return pages.data.map((page:any) => ({
    slug: page.slug,
  }));
}


interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PageBySlugRoute({ params }: PageProps) {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;

  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";
  
  const data = await getPageBySlug(slug, status);
  const blocks = data?.data[0]?.blocks;
  if (!blocks) return null;
  return (
     <DefaultLayout>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {blocks ? <BlockRenderer blocks={blocks} /> : null}
      </div>
     </DefaultLayout>
     );
}
