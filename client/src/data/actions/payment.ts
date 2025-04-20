// app/actions.ts
"use server";

import { createPayment } from "@/data/services/payment";
import { redirect } from "next/navigation";
import { getAuthToken } from "../services/get-auth-token";

export async function createNewPayment(price: number) {
    const authToken = await getAuthToken();
    if (!authToken) {
      redirect("/signin");
    }
  
    try {
      await createPayment(price);
    } catch (e) {
      throw new Error("Failed to create payment");
    }
  
    redirect("/thank-you");
  }