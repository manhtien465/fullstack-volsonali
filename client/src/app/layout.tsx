import "./globals.css";

import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { getGlobalPageData } from "@/data/loaders";
import useAuthInfo from "@/hooks/use-auth-info/useAuthInfo";
import { cookies } from "next/headers";
import { getUserMeLoader } from "@/data/services/user";
import ClientAuthHydrator from "@/components/clientHydrator";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LazyBlog",
  description: "Generate blog easy",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("jwt")?.value;
  const data = await getGlobalPageData();
  if (!data) notFound();

  const { topNav, footer } = data.data;
  const userRes = token ? await getUserMeLoader() : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          <Header data={topNav} user={userRes?.data}/>
          {children}
          <Footer data={footer}/>
        </ThemeProvider>
      </body>
    </html>
  );
}
