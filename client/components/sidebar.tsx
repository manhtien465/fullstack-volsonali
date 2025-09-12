import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ESort } from "@/constants/sort";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/services/postService";
import Link from "next/link"

export let revalidate = 60 * 60;

export default async function Sidebar() {
  const { data } = await getBlogPosts(1, '', '', 5, ESort.NEWEST);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-blue-200">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Latest Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 pt-0">
          {data.map((post, index) => (
            <div key={post.id} className="flex items-start space-x-2 sm:space-x-3">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white text-xs font-bold rounded">
                  #{index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(post.publishedAt)}</p>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
