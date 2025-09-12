import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Search } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { getBlogPosts } from "@/services/postService"
import { ETypePosts } from "@/features/post/constants/data"
import { SearchComponent } from "@/components/custom/search"
import { Sort } from "@/features/reviews/ui/sort"
import { StrapiImage } from "@/components/custom/strapi-image"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { PaginationComponent } from "@/components/pagination/pagination"
import { getHtmlBySlug, getHtmls } from "@/features/games/service/get-games"
import { ETypeHtml } from "@/features/games/constants/data"
import { PAGE_SIZE } from "@/constants/common"
import GAMAdUnit from "@/components/ads/GAMAdUnit"

interface TipsGuidesPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ReviewsPage({ searchParams }: TipsGuidesPageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? "1");
  const queryString = params.keyword ?? "";
  const category = params.category ?? "";
  const { data,meta } = await getHtmls(page, queryString, category, undefined, PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Game Reviews</h1>
            <p className="text-gray-600">In-depth reviews and analysis of the latest games</p>
          </div>

          {/* Search and Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <SearchComponent placeholder="Search reviews..." />
                
              </div>

              <Sort/>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* <PageSizeSelector pageSize={pageSize} onPageSizeChange={setPageSize} options={[3, 6, 12, 24]} /> */}

              <div className="text-sm text-gray-600">{data.length} reviews found</div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-8 mb-8">
            <GAMAdUnit adId="div-gpt-ad-1755424941447-0" style={{ minWidth: 180, minHeight: 60 }}></GAMAdUnit>            
            {data.map((review) => (
              <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/games/${review.slug}`}>     
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative">
                      <StrapiImage
                        src={review?.image[0]?.url || "/placeholder.svg"}
                        alt={review.name}
                        width={400}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-orange-600 hover:bg-orange-700">
                        {review.category_html.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          {review.name}
                        </h2>
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-bold text-lg">{review.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{review.desc}</p>

                      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {review.pros?.map((pro:string, index:number) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {review.cons?.map((con:string, index:number) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div> */}

                      <p className="text-gray-500 text-sm">{formatDate(review?.publishedAt)}</p>
                    </CardContent>
                  </div>
                </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <PaginationComponent pageCount={meta.pagination?.pageCount ?? 0} />
        </div>

        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
