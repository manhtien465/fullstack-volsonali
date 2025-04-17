import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { MarkdownText } from "@/components/custom/markdown-text";
import { StrapiImage } from "@/components/custom/strapi-image";
import { getBlogPostBySlug } from "@/data/loaders";
import { BlockRenderer } from "@/components/block-renderer";
import { getProductById } from "@/data/services/product";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";

  const data = await getProductById(slug);

  if (!data?.data?.[0]) {
    return {
      title: "Next.js Strapi Preview",
      description: "Next.js Strapi Preview",
    };
  }

  const post = data.data[0];

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";
  const data = await getProductById(slug);
  const product = data?.data;

  if (!product) notFound();


  return (
    <article>
      <div>
        <header className="container mx-auto my-10">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-5xl mb-4">
            {product.title}
          </h1>
          </header>
          </div>
    </article>
  );
}
