import { getStrapiURL } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ [key: string]: string }> }
) {
  const resolvedParams = await params;

  console.log("*****************", resolvedParams, "*****************");

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const provider = resolvedParams.provider;
  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  const res = await fetch(url.href);
  const data = await res.json();

  const cookieStore = await cookies();
  cookieStore.set("jwt", data.jwt, config);
  const redirectHost = process.env.HOST ?? "localhost:3000"; 
  const redirectProtocol = process.env.REDIRECT_PROTOCOL ?? "https";
  const redirectUrl = `${redirectProtocol}://${redirectHost}/dashboard`;
  return NextResponse.redirect(redirectUrl);
}
