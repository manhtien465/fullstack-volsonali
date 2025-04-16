import { NextRequest, NextResponse } from "next/server";

// Replace with your actual secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;

  const protectedPaths = ["/dashboard", "/product"];
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedPaths.some(path => currentPath.startsWith(path));

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    // const decoded = jwt.verify(token, JWT_SECRET);
    // Optionally attach user info to request
    // You could also use headers like: request.headers.set("x-user-id", decoded.sub)
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}
