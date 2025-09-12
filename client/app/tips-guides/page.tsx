import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Target, Trophy } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { getBlogPosts } from "@/services/postService"
import { ETypePosts } from "@/features/post/constants/data"
import { StrapiImage } from "@/components/custom/strapi-image"
import { formatDate } from "@/lib/utils"
import Link from "next/link"


const quickTips = [
  "Always warm up before competitive matches",
  "Adjust your sensitivity settings regularly",
  "Study professional player strategies",
  "Take regular breaks to avoid fatigue",
  "Practice aim training daily",
  "Learn from your mistakes and replays",
]
export let revalidate = 60 * 60;

interface TipsGuidesPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
export default async function TipsGuidesPage({ searchParams }: TipsGuidesPageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? "1");
  const queryString = params.keyword ?? "";
  const category = params.category ?? "";
  const { data } = await getBlogPosts(page, queryString, category, undefined, undefined, ETypePosts.TIP_GUIDES);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tips & Guides</h1>
            <p className="text-gray-600">Expert tips and comprehensive guides to level up your gaming</p>
          </div>

          {/* Quick Tips Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Quick Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Articles */}
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
                        <Badge className="absolute top-3 left-3 bg-purple-600 hover:bg-purple-700 flex items-center space-x-1">
                          {/* <IconComponent text={article.title}/> */}
                          <span>{article.category?.title}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-3">{article.excerpt}</p>
                        <p className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</p>
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
