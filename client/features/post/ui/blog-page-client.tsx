"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination1";
import { PageSizeSelector } from "@/components/ui/page-size-selector";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";

export default function BlogPageClient({
  initialPosts,
  categories,
  currentPage,
  currentQuery,
  currentCategory,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateQuery = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  };

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  };

  const posts = initialPosts.data;
  const pagination = initialPosts.pagination;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => updateQuery("category", "")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-50 transition-colors ${currentCategory === "" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                >
                  All Posts
                </button>
                {categories.data.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => updateQuery("category", cat.text)}
                    className={`w-full text-left p-2 rounded hover:bg-gray-50 transition-colors ${currentCategory === cat.text ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                  >
                    {cat.text}
                  </button>
                ))}
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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search blog posts..."
                  defaultValue={currentQuery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateQuery("q", e.currentTarget.value);
                    }
                  }}
                  className="pl-10"
                />
              </div>
              <Select
                value={currentCategory || ""}
                onValueChange={(value) => updateQuery("category", value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Posts</SelectItem>
                  {categories.data.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.text}>
                      {cat.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8 mb-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative">
                      <Image
                        src={post.image?.url || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-indigo-600 hover:bg-indigo-700">
                        {post.category?.text}
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
                        <span>{post.readTime ?? "5 min read"}</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination pagination={pagination} onPageChange={updatePage} showInfo />
        </div>
      </div>
    </div>
  );
}
