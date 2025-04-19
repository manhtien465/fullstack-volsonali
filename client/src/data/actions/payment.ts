// app/actions.ts
"use server";

import { createPayment } from "@/data/services/payment";
import { redirect } from "next/navigation";
import { getUserMeLoader } from "../services/user";

export async function createNewPayment(price: number) {
    try {
        const me= await  getUserMeLoader()
        await createPayment(price);
        redirect("/thank-you");
    } catch (error) {
        console.error("Payment creation failed:", error);
        throw error; // Or redirect to an error page
    }
  
}