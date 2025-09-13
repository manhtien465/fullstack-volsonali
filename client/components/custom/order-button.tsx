"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OrderButtonProps {
  price: number;
  linkText: string;
  createOrder?: (price: number) => Promise<void>;
}

export function OrderButton({ price, linkText, createOrder }: OrderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // await createOrder(price);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="mt-10 w-full"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        linkText
      )}
    </Button>
  );
}
