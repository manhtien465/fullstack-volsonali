"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryButton({
  value,
  children,
}: {
  value: string;
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
    <button
      type="button"
      onClick={() => handleSelect(value)}
     className={`w-full text-left p-2 rounded hover:bg-gray-50 transition-colors ${
              currentCategory === value? "bg-blue-50 text-blue-600" : "text-gray-700"
            }`}
    >
      {children}
    </button>
  );
}
