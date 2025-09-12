import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/sidebar"
import { getBlogPosts } from "@/services/postService"
import { ETypePosts } from "@/features/post/constants/data"
import { StrapiImage } from "@/components/custom/strapi-image"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface HowToPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
export default async function HowToPage({ searchParams }: HowToPageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? "1");
  const queryString = params.keyword ?? "";
  const category = params.category ?? "";
  const { data, meta } = await getBlogPosts(page, queryString, category, undefined, undefined, ETypePosts.HOW_TO);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">How-To Guides</h1>
            <p className="text-gray-600">Step-by-step guides to improve your gaming skills</p>
          </div>

          <div className="space-y-6">
            {data.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                 <Link href={`/blog/${article.slug}`} aria-label={`Read more about ${article?.title}`}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative">
                      <StrapiImage
                        src={article.image?.url}
                        alt={article.image.alternativeText}
                        width={400}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700">
                        {article.category?.title}
                      </Badge>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
