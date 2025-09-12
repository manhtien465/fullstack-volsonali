import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { MarkdownText } from "@/components/custom/markdown-text";
import { StrapiImage } from "@/components/custom/strapi-image";
import { getBlogPostBySlug, getBlogPosts } from "@/services/postService";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { CalendarDays, User } from "lucide-react";
import Link from "next/link";
import GAMAdUnit from "@/components/ads/GAMAdUnit";
import PopularNow from "@/features/games/ui/popular-now";

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

  const data = await getBlogPostBySlug(slug, status);
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

export default async function SinglePost({ params }: PageProps) {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";
  const data = await getBlogPostBySlug(slug, status);
  const post = data?.data[0];
  const { data: relatedPost } = await getBlogPosts(1, '', post.category.slug, 3, undefined, undefined,post.id);

  if (!post) notFound();


  return (
    // <article>
    //   <div>
    //     <div className="container mx-auto my-10">
    //       <h1 className="text-6xl font-bold tracking-tighter sm:text-5xl mb-4">
    //         {post.title}
    //       </h1>
    //       <p className="text-muted-foreground">
    //         Posted on {formatDate(post.publishedAt)} - {post.category.title}
    //       </p>
    //       <StrapiImage
    //         src={post.image?.url}
    //         alt={post.image?.alternativeText}
    //         width={800}
    //         height={600}
    //         priority
    //         className="w-full rounded-lg mt-8"
    //       />
    //     </div>
    //   </div>

    //   {post.content && (
    //     <div className="container mx-auto max-w-4xl text-base leading-7">
    //       <MarkdownText content={post.content} />
    //     </div>
    //   )}

    // </>
    <article  className="max-w-7xl mx-auto px-4 py-8">
      <FadeInSection delay={200} direction="up">
        <Card className="overflow-hidden shadow-lg rounded-xl">

          {/* <h1 className="text-6xl font-bold tracking-tighter sm:text-5xl mb-4">
            {post.title}
          </h1> */}
          {post.image && (
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
              <StrapiImage
                src={post.image?.url}
                alt={post.image?.alternativeText}
                width={800}
                height={600}
                priority
                className="w-full rounded-lg mt-8"
                // fill
                // className="object-cover object-center transition-transform duration-500 hover:scale-105"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                // priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <AnimatedText
                  text={post.title}
                  className="text-2xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
                  delay={400}
                  speed={50}
                />
                <div className="flex items-center gap-4 mt-2 text-sm md:text-base text-gray-200">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
            <GAMAdUnit adId="div-gpt-ad-1755424941447-9" style={{ minWidth: 180, minHeight: 60 }}></GAMAdUnit>            
            <PopularNow></PopularNow>

          <CardContent className="p-6 md:p-8 lg:p-10">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownText content={post.content} />
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      <FadeInSection delay={600} direction="up" className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">More from our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPost
            .map((relatedPost) => (
              <Card
                key={relatedPost.slug}
                className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href={`/blog/${relatedPost.slug}`} aria-label={`Read more about ${relatedPost.title}`}>
                <StrapiImage
                  src={relatedPost?.image?.url || "/placeholder.svg?height=200&width=300&text=Blog+Post"}
                  alt={relatedPost?.image?.alternativeText}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{relatedPost.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-3">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div
                   
                    className="mt-4 inline-block text-pink-600 hover:text-pink-700 font-medium text-sm"
                  >
                    Read More &rarr;
                  </div>
                </CardContent>
                </Link>
              </Card>
            ))}
        </div>
      </FadeInSection>
    </article>
  );
}
