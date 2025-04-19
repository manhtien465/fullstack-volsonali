"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankyouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Thank You!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your request has been successfully submitted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-gray-500">
              We’ve received your setup request and will contact you soon with next steps.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="default" className="w-full max-w-xs">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
        </div>
    </div>
  );
}