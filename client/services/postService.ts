import { ESort } from "@/constants/sort";
import { ETypePosts } from "@/features/post/constants/data";
import sdk from "@/lib/sdk";
const PAGE_SIZE = 12;


export async function getCategories() {
  const categories = await sdk.collection("category-post-games").find({
    fields: ["title", "description","slug"],
  });
  return categories;
}

export async function getBlogPostBySlug(slug: string, status: string) {
  const post = await sdk.collection("post-games").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["title"],
      },
    },
    filters: {
      slug: { $eq: slug },
    },
    status: status as "draft" | "published" | undefined,
  });
  return post;
}

// TODO: FIX THE SEARCH QUERY
export async function getBlogPosts(
  page: number,
  queryString: string,
  category: string,
  pagesize? :number,
  sortBy?: ESort,
  type?:ETypePosts,
  igore? :number,
) {
  const posts = await sdk.collection("post-games").find({
    fields: ["title", "excerpt","slug",'description',"publishedAt"],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["title"],
      },
    },

    filters: {
      title: { $containsi: queryString },
      ...(type && { type: { $eq: type } }),
      ...(category && { category: { title: { $eq: category } } }),
      ...(igore && { id: { $nei: igore } }),
    },
    sort: sortBy ? [sortBy] : [ESort.NEWEST],

    pagination: {
      pageSize: pagesize ?? PAGE_SIZE,
      page: page,
    },
  });
  return posts;
}
