"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryButton({
  value,
  children,
  size,
}: {
  value: string;
  size:"default" | "sm" | "lg" | "icon" | null | undefined,
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category");
  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value.toLowerCase());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Button
      type="button"
      size={size}
      variant={value === currentCategory ? "default" : "outline"}
      onClick={() => handleSelect(value)}
       className={`text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 ${
                value === currentCategory ? "bg-pink-600 hover:bg-pink-700 text-white" : "hover:bg-gray-50"
              }`}
    >
      {children}
    </Button>
  );
}
