import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogOut } from "lucide-react";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

async function logoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="bg-transparent flex justify-between items-center text-muted-foreground w-full hover:bg-gray-200 border-none rounded px-2 py-2">
        <div>Logout</div> 
        <LogOut className="ml-2 h-4 w-4" />
      </button>
    </form>
  );
}
