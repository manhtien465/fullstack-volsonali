import sdk from "@/lib/sdk";
import { EGroups, ETypeHtml } from "../constants/data";
import { ESort } from "@/constants/sort";

export async function getHtmlBySlug(slug: string, status: string) {
  const post = await sdk.collection("htmls").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      screenshots: {
        fields: ["url", "alternativeText", "name"],
      },
      category_html: {
        fields: ["name", "slug"],
      },
    },
    filters: {
      slug: { $eq: slug },
    },
    status: status as "draft" | "published" | undefined,
  });
  return post;
}

export async function getCategories(type?: string, isDisplayFooter?: boolean) {
  const categories = await sdk.collection("category-htmls").find({
    fields: ["name", "desc", 'slug'],
    filters: {
      ...(type && { type: { $eq: type } }),
      ...(isDisplayFooter && { is_display_footer: { $eq: isDisplayFooter } }),

    },
  });
  return categories;
}

export async function getHtmls(
  page: number,
  queryString: string,
  category: string,
  isDisplayHomePage?: boolean,
  pageSize?: number,
  type?: ETypeHtml,
  isPopular?: boolean,
  sortBy?: ESort
) {
  const posts = await sdk.collection("htmls").find({
    fields: ["name", 'slug', 'is_editor_choice', "desc", 'publishedAt'],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category_html: {
        fields: ["name", 'slug'],
      },
    },


    filters: {
      name: { $containsi: queryString },
      ...(category && { category_html: { slug: { $eq: category } } }),
      ...(isDisplayHomePage && { is_display_home: { $eq: isDisplayHomePage } }),
      ...(type && { type: { $eq: type } }),
      ...(isPopular && { is_popular: { $eq: isPopular } }),
    },
    sort: sortBy ? [sortBy] : [ESort.PUBLISHNEWEST],
    pagination: {
      pageSize: pageSize ?? 10000,
      page: page,
    },
  });
  return posts;
}


export async function getHtmlsMain(
  page: number,
  queryString: string,
  category: string,
  isDisplayHomePage?: boolean,
  pageSize?: number,
  type?: ETypeHtml,
  isPopular?: boolean,
  sortBy?: ESort
) {
  const posts = await sdk.collection("htmls").find({
    fields: ["name", 'slug', 'is_editor_choice'],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category_html: {
        fields: ["name", 'slug'],
      },
    },


    filters: {
      name: { $containsi: queryString },
      ...(category && { category_html: { slug: { $eq: category } } }),
      ...(isDisplayHomePage && { is_display_home: { $eq: isDisplayHomePage } }),
      ...(type && { type: { $eq: type } }),
      ...(isPopular && { is_popular: { $eq: isPopular } }),
    },
    sort: sortBy ? [sortBy] : [ESort.PUBLISHNEWEST],
    pagination: {
      pageSize: pageSize ?? 10000,
      page: page,
    },
  });
  return posts;
}

export async function getHtmlPopularLayout(
  page: number,
  pageSize?: number,
  isPopular?: boolean,
) {
  const posts = await sdk.collection("htmls").find({
    fields: ["name", 'slug'],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      }
    },
    filters: {
      ...(isPopular && { is_popular_layout: { $eq: isPopular } }),
    },
    pagination: {
      pageSize: pageSize ?? 10000,
      page: page,
    },
  });
  return posts;
}

export async function getHtmlGroups(
  page: number,
  pageSize?: number,
  group?: EGroups,
) {
  const posts = await sdk.collection("htmls").find({
    fields: ["name", 'slug'],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      }
    },
    filters: {
      ...(group && { group: { $eq: group } }),
    },
    pagination: {
      pageSize: pageSize ?? 10000,
      page: page,
    },
  });
  return posts;
}

export async function getHtmlFooter(
  page: number,
  pageSize?: number,
  isInternal?: boolean,
) {
  const posts = await sdk.collection("htmls").find({
    fields: ["name", 'slug'],
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      }
    },
    filters: {
      ...(isInternal && { is_internal: { $eq: isInternal } }),
    },
    pagination: {
      pageSize: pageSize ?? 1000,
      page: page,
    },
  });
  return posts;
}

