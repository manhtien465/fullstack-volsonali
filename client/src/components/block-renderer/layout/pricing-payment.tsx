
import type { PriceGridPaymentProps } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { OrderButton } from "@/components/custom/order-button";
import { createNewPayment } from "@/data/actions/payment";

export function PricingPayment(data: Readonly<PriceGridPaymentProps>) {
  if (!data) return null;
  const priceItems = data.priceCard;

  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="mt-7 grid w-full grid-cols-1 gap-7 lg:grid-cols-3">
        {priceItems.map(({ id, heading, description, price, priceTitle, selected, feature, link }) => {
          const selectedStyle = selected ? "border-2 border-primary" : "";
          return (
            <Card className={cn("relative shadow-lg", selectedStyle)} key={id}>
              <CardContent className="flex flex-col items-start p-7">
                <h4 className="font-heading text-2xl font-semibold text-foreground">{heading}</h4>
                <p className="mt-2 text-muted-foreground">{description}</p>
                <div className="mt-5">
                  <span className="font-heading text-5xl font-semibold">{priceTitle}</span>
                  {/* <span className="text-sm"> /month </span> */}
                </div>
                <ul className="space-y-2 mt-9">
                  {feature?.map((item) => (
                    <li className="flex items-center gap-2" key={item.id}>
                      <Check size={20} className="text-primary" />
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                    </li>
                  ))}
                </ul>
               <OrderButton price={Number(price)} linkText={link.text} createOrder={createNewPayment}></OrderButton>
               
              </CardContent>
              {selected ? (
                <span className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md">
                  Most popular
                </span>
              ) : null}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
