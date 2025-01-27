"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { ChevronLeft } from "lucide-react";
import { Product, productState } from "menu";
import { useMemo } from "react";

export function VariantAccordion({
  product,
  menuSample,
  activeProduct,
}: {
  product: productState;
  activeProduct: Product;
  menuSample: string;
}) {
  const { changeVariant } = useMenu();
  return (
    <Accordion type="single" collapsible className="h-full w-full">
      <AccordionItem value="item-1" className="h-full">
        <AccordionTrigger
          className={`h-full overflow-x-auto whitespace-nowrap border-x p-5 text-start`}
        >
          <div className="flex items-center gap-x-2">{activeProduct.name}</div>
        </AccordionTrigger>
        <AccordionContent className="h-full w-full pb-0">
          <ul className="flex gap-x-3 overflow-x-auto border border-y-0 px-4 pb-4">
            <li key={product.id}>
              <Button
                variant={"outline-accent"}
                onClick={() =>
                  changeVariant(menuSample, product.id, product.id)
                }
                className={`${product.active == product.id ? "bg-accent/30" : ""} 
                  menu-table-variants flex h-8 
                  rounded-xl text-foreground`}
              >
                {product.name}
              </Button>
            </li>
            {product.variants?.map((variant) => (
              <li key={variant.id}>
                <Button
                  variant={"outline-accent"}
                  onClick={() =>
                    changeVariant(menuSample, product.id, variant.id)
                  }
                  className={`${product.active == variant.id ? "bg-accent/30" : ""} 
                  menu-table-variants h-8 rounded-xl text-foreground 
                  `}
                >
                  {variant.name}
                </Button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
