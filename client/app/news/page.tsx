import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { getBlogPosts } from "@/services/postService"
import { SearchComponent } from "@/components/custom/search"
import { StrapiImage } from "@/components/custom/strapi-image"
import { PaginationComponent } from "@/components/pagination/pagination"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { ESort } from "@/constants/sort"
import { ETypePosts } from "@/features/post/constants/data"

interface NewPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
export let revalidate = 60 * 60;

export default async function NewPage({ searchParams }: NewPageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? "1");
  const queryString = params.keyword ?? "";
  const category = params.category ?? "";
  const { data, meta } = await getBlogPosts(page, queryString, category,12,ESort.NEWEST,ETypePosts.NEWS);

  const featuredArticle = data[0]
  const regularArticles = data.slice(1)
  const total = Number(meta?.pagination?.pageCount);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gaming News</h1>
            <p className="text-gray-600">Stay updated with the latest gaming news and updates</p>
          </div>
        </div>
      </div>
      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <SearchComponent placeholder="Search news articles..." />


        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* <PageSizeSelector pageSize={pageSize} onPageSizeChange={setPageSize} options={[5, 10, 20, 50]} /> */}

          {/* <div className="text-sm text-gray-600">{filteredArticles.length} articles found</div> */}
        </div>
      </div>

      {/* Main Layout: 1 Big Article Left, 2 Small Articles Right */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Side - Big Featured Article */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <Link href={`/blog/${featuredArticle?.slug}`}  aria-label={`Read more about ${featuredArticle?.title}`}>
              <div className="relative h-[400px]">
                <StrapiImage
                  src={featuredArticle?.image?.url}
                  alt={featuredArticle?.image?.alternativeText}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold">
                    {featuredArticle?.category?.title}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredArticle?.title}</h2>
                <p className="text-gray-600 mb-4">{featuredArticle?.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">{formatDate(featuredArticle?.publishedAt)}</p>
                  <span className="text-indigo-600 font-medium hover:text-indigo-800">
                    Read More →
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Right Side - 2 Small Articles */}
        <div className="space-y-6">
          {regularArticles.slice(0, 2).map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${article.slug}`} aria-label={`Read more about ${article?.title}`}>
                <div className="relative h-[180px]">
                  <StrapiImage src={article.image?.url} alt={article.image?.alternativeText} fill className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs">
                      {article.category?.title}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-xs">{formatDate(featuredArticle?.publishedAt)}</p>
                     <span className="text-indigo-600 font-medium hover:text-indigo-800">
                    Read More →
                  </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Remaining Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.slice(2).map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/blog/${article.slug}`} aria-label={`Read more about ${article?.title}`}>
              <div className="relative h-[160px]">
                <StrapiImage src={article.image?.url} alt={article.image?.alternativeText} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-xs">{article.date}</p>
                  <span className="text-indigo-600 font-medium hover:text-indigo-800">
                    Read More →
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <PaginationComponent pageCount={total} />



      <div className="lg:col-span-1">
        {/* <Sidebar /> */}
      </div>
    </div>
  )
}
