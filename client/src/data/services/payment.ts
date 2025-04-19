// src/data/services/payment.ts
import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-auth-token";

export async function createPayment(price: number) {
  const baseUrl = getStrapiURL();
  const path = "/api/payments";

  const url = new URL(path, baseUrl);
  const authToken = await getAuthToken();

  if (!authToken) {
    return { ok: false, data: null, error: "No authentication token" };
  }

  try {
    const body = {
      data: {
        price,
      },
    };

    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body), // No need for {...body}
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      return {
        ok: false,
        data: null,
        error: `Server error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Create Payment Service Error:", error)
  }
}