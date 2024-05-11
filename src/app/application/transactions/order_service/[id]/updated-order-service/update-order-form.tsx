"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DataTable as ProductsCart } from "./update-order-cart/products-cart/data-table";
import { DataTable as PartsCart } from "./update-order-cart/parts-cart/data-table";

import { initiateColumns as initiateProductsCartColumns } from "./update-order-cart/products-cart/columns";
import { initiateColumns as initiatePartsCartColumns } from "./update-order-cart/parts-cart/columns";

import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useOrderServices } from "@/hooks/useOrderServices";
import { useSelector } from "react-redux";
import OrderCartOptions from "./update-order-table/lists";
import { useDispatch } from "react-redux";
import { resetOrderCart } from "@/redux/slices/viewOrderCartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrderForm({ setDialogOpen, data }: any) {
  const [isPending, startTransition] = useTransition();
  const { updateOrderService } = useOrderServices();
  const dispatch = useDispatch();

  const orderCart = useSelector((state: any) => state.viewOrderCart);
  const orderServiceCart = useSelector(
    (state: any) => state.viewOrderServiceCart
  );

  const orderCartOptions = useSelector(
    (state: any) => state.orderCartOptionSlice
  );

  const orderServiceSchema: any = z.object({
    id: z.string().nullable(),
    discount: z.coerce.number().nullable(),
    subtotal: z.coerce.number(),
    total_price: z.coerce.number().nullable(),

    // Collections
    purchase_products: z.array(
      z.object({
        product_id: z.coerce.number().nullable(),
        inventory_id: z.coerce.number().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string().nullable(),
        barcode: z.string().nullable(),
        uom_name: z.string().nullable(),
        quantity: z.coerce.number().nullable(),
        price: z.coerce.number().nullable(),
      })
    ),
    purchase_parts: z.array(
      z.object({
        part_id: z.coerce.number().nullable(),
        inventory_id: z.coerce.number().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string().nullable(),
        barcode: z.string().nullable(),
        brand_name: z.string().nullable(),
        quantity: z.coerce.number().nullable(),
        price: z.coerce.number().nullable(),
      })
    ),
  });

  const form = useForm<z.infer<typeof orderServiceSchema>>({
    resolver: zodResolver(orderServiceSchema),
    defaultValues: {
      id: data.id,
      total_price: 0,
      subtotal: 0,
      discount: data.discount || 0,
    },
  });

  form.setValue("purchase_products", orderCart.productsCart);
  form.setValue("purchase_parts", orderCart.partsCart);
  form.setValue("purchase_services", orderServiceCart.servicesCart);
  form.setValue(
    "subtotal",
    (
      orderCart.productsCart.reduce(
        (acc: any, product: any) => acc + product.price * product.quantity,
        0
      ) +
      orderCart.partsCart.reduce(
        (acc: any, part: any) => acc + part.price * part.quantity,
        0
      ) +
      orderServiceCart.servicesCart.reduce(
        (acc: any, service: any) => acc + service.price,
        0
      ) +
      data.purchase_products.reduce(
        (acc: any, product: any) => acc + product.price * product.quantity,
        0
      ) +
      data.purchase_parts.reduce(
        (acc: any, part: any) => acc + part.price * part.quantity,
        0
      )
    ).toFixed(2)
  );
  form.setValue(
    "total_price",
    Number(
      (
        (orderCart.productsCart.reduce(
          (acc: any, product: any) =>
            acc +
            (isNaN(product.price) || isNaN(product.quantity)
              ? 0
              : product.price * product.quantity),
          0
        ) +
          orderCart.partsCart.reduce(
            (acc: any, part: any) =>
              acc +
              (isNaN(part.price) || isNaN(part.quantity)
                ? 0
                : part.price * part.quantity),
            0
          ) +
          orderServiceCart.servicesCart.reduce(
            (acc: any, service: any) =>
              acc + (isNaN(service.price) ? 0 : service.price),
            0
          ) +
          data.purchase_products.reduce(
            (acc: any, product: any) =>
              acc +
              (isNaN(product.price) ? 0 : product.price * product.quantity),
            0
          ) +
          data.purchase_parts.reduce(
            (acc: any, part: any) =>
              acc + (isNaN(part.price) ? 0 : part.price * part.quantity),
            0
          )) *
        ((100 -
          (isNaN(form.getValues("discount"))
            ? 0
            : Number(form.getValues("discount")))) /
          100)
      ).toFixed(2)
    )
  );
  useEffect(() => {
    // console.log(form.getValues("purchase_services"));
    if (form.formState.errors) {
      console.log(form.formState.errors);
    }
    // console.log(form.getValues("total_price"));
    // console.log(form.getValues("subtotal"));
    // console.log(form.getValues("id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCart.productsCart, orderCart.partsCart]);

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await updateOrderService(data, 500);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }

      setDialogOpen(false);
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        dispatch(resetOrderCart());
      });
    });
  }

  function onCancel() {
    dispatch(resetOrderCart());
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-4">
          <div className="w-[60%] 2xl:w-[50%] h-full rounded-lg overflow-hidden">
            <OrderCartOptions />
          </div>
          <ScrollArea className="w-full h-[553px] 2xl:h-[657px] flex flex-col justify-between bg-darkBg rounded-lg border border-lightBorder p-0 px-4 gap-0 relative">
            <div className="w-full h-full flex flex-col gap-6 justify-between relative">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                defaultValue={["item-1", "item-2"]}
              >
                {orderCart.productsCart.length > 0 && (
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                      Products Summary
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <ProductsCart
                        columns={initiateProductsCartColumns(
                          dispatch,
                          orderCartOptions.productsData
                        )}
                        data={orderCart.productsCart}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
                {orderCart.partsCart.length > 0 && (
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                      Parts Summary
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <PartsCart
                        columns={initiatePartsCartColumns(
                          dispatch,
                          orderCartOptions.partsData
                        )}
                        data={orderCart.partsCart}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
              <div className="w-full flex-col relative">
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">
                    Subtotal
                  </span>
                  <span className="w-[20%] text-end">{`₱ ${(
                    orderCart.productsCart.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                    orderCart.partsCart.reduce(
                      (acc: any, part: any) => acc + part.price * part.quantity,
                      0
                    )
                  )
                    .toFixed(
                      // sum all the products and parts
                      2
                    )
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                </div>

                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">Tax</span>
                  <span className="w-[20%] text-end">₱ 0.00</span>
                </div>
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">VAT</span>
                  <span className="w-[20%] text-end">₱ 0.00</span>
                </div>
                <div className="w-full py-6 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-lg font-bold">
                  <span className="w-full text-end">Total</span>
                  <span className="w-[20%] text-end">{`₱ ${(
                    (orderCart.productsCart.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                      orderCart.partsCart.reduce(
                        (acc: any, part: any) =>
                          acc + part.price * part.quantity,
                        0
                      )) *
                    ((100 - Number(form.getValues("discount"))) / 100)
                  )
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 text-red-500 bg-transparent hover:bg-transparent"
            type="button"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Add Purchases</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
