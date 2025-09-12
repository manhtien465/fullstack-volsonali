"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "rating-high", label: "Highest Rated" },
    { value: "rating-low", label: "Lowest Rated" },
]
  export const Sort = () => {
    const [sortBy, setSortBy] = useState("newest")
    const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

    const handleChangeValue = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }
        setSortBy(value)
        // router.push(`${params.toString()}`)
        replace(`${pathname}?${params.toString()}`);
    }


    return (
        <Select
            value={sortBy}
            onValueChange={(value) => handleChangeValue(value)}
        >
            <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
