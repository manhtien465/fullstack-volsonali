import { getStrapiURLInClient } from '@/lib/utils';
import { strapi } from '@strapi/sdk-js';
import 'dotenv/config';
import { ETypeHtml } from '../constants/data';


const BASE_API_URL = getStrapiURLInClient() + "/api";
const sdk = strapi({ baseURL: BASE_API_URL });

export default sdk;


export async function getAllHtmlGameSlug() {
  const slugs: string[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await sdk.collection("htmls").find({
      fields: ["slug"],
      filters: {
        type: { $eq: ETypeHtml.GAME },
      },
      pagination: {
        pageSize: 400,
        page: page,
      },
    });
    const items = response.data;
    slugs.push(...items.map((item: any) => item.slug));
   const pagination = response.meta.pagination;
    if (!pagination) {
      throw new Error("Pagination is missing from response meta");
    }
    const { page: currentPage, pageCount } = pagination;
    hasNextPage = currentPage < pageCount;
    page++;
  }

  return slugs;
}

export async function getAllHtmlToolSlug() {
  const slugs: string[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await sdk.collection("htmls").find({
      fields: ["slug"],
      filters: {
        type: { $eq: ETypeHtml.TOOL },
      },
      pagination: {
        pageSize: 400,
        page: page,
      },
    });

    const items = response.data;
    slugs.push(...items.map((item: any) => item.slug));
   const pagination = response.meta.pagination;
    if (!pagination) {
      throw new Error("Pagination is missing from response meta");
    }
    const { page: currentPage, pageCount } = pagination;
    hasNextPage = currentPage < pageCount;
    page++;
  }

  return slugs;
}

export async function getAllPostSlug() {
  const slugs: string[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await sdk.collection("post-games").find({
      fields: ["slug"],
      pagination: {
        pageSize: 400,
        page: page,
      },
    });
    console.log('data',response)
    const items = response.data;
    slugs.push(...items.map((item: any) => item.slug));
   const pagination = response.meta.pagination;
    if (!pagination) {
      throw new Error("Pagination is missing from response meta");
    }
    const { page: currentPage, pageCount } = pagination;
    hasNextPage = currentPage < pageCount;
    page++;
  }

  return slugs;
}
