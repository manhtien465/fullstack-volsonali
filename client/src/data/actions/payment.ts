// app/actions.ts
"use server";

import { createPayment } from "@/data/services/payment";
import { redirect } from "next/navigation";
import { getAuthToken } from "../services/get-auth-token";

export async function createNewPayment(price: number) {
    try {
        const authToken = await getAuthToken();
        if (!authToken) {
            return redirect("/signin");
        }
        await createPayment(price);
        redirect("/thank-you");
    } catch (error) {
        throw new Error("Error create new payment");
    }

}