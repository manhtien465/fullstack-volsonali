import { getBlogPosts } from "@/services/postService";

import { Card, CardContent } from "@/components/ui/card";

import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
import { PaginationComponent } from "@/components/pagination/pagination";
import { StrapiImage } from "@/components/custom/strapi-image";
import { SearchComponent } from "@/components/custom/search";
import { CategorySelect } from "@/features/post/ui/category-select";
import CategoryButton from "@/features/post/ui/category-button";
import Link from "next/link";

interface BlogPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
export let revalidate = 60 * 60;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? "1");
  const queryString = params.keyword ?? "";
  const category = params.category ?? "";
  const { data, meta } = await getBlogPosts(page, queryString, category);

  const total = Number(meta?.pagination?.pageCount);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <CategoryButton
                  value=""
                >
                  All Posts
                </CategoryButton>
                <CategorySelect currentCategory={category}></CategorySelect>

              </div>
            </CardContent>
          </Card>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gaming Blog</h1>
            <p className="text-gray-600">Insights, tutorials, and thoughts on the gaming industry</p>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchComponent placeholder="Search blog posts..." />
              <Select
              // value={currentCategory || ""}
              // onValueChange={(value) => updateQuery("category", value)}
              >
                {/* <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Posts</SelectItem>
                  {categories.data.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.text}>
                      {cat.text}
                    </SelectItem>
                  ))}
                </SelectContent> */}
              </Select>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8 mb-8">
            {data.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative">
                        <StrapiImage
                          src={post.image?.url}
                          alt={post.image?.alternativeText}
                          width={400}
                          height={200}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-indigo-600 hover:bg-indigo-700">
                          {post?.category?.text}
                        </Badge>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{post.description}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{post.createdAt?.slice(0, 10)}</span>
                          <span>{post.read_time ? `${post.read_time} min read`  : "5 min read"}</span>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <PaginationComponent pageCount={total} />
        </div>
      </div>
    </div>

  );
}
