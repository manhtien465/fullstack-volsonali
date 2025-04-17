
import { getStrapiURL } from "@/lib/utils";
export async function getProductById(id:string) {
  const baseUrl = getStrapiURL();
  const path = `/strapi-paypal/getProduct/${id}`;

  const url = new URL(path, baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await response.json();
    
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}