import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";
import { TbCurrencyPeso } from "react-icons/tb";

import UomInput from "./uom-input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import ImageInput from "./image-input";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useMainStocks } from "@/hooks/useMainStocks";

export const stocksSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Stock name is required",
  }),
  description: z.string().min(1, {
    message: "Stock description is required",
  }),
  image_url: z.string().default("something"),
  category: z.string().min(1, {
    message: "Stock category is required",
  }),
  stock_quantity: z.coerce.number().min(1, {
    message: "Stock quantity must be at least 1",
  }),
  price: z.coerce.number().min(1, {
    message: "Stock price is required",
  }),
  uom_id: z
    .string()
    .min(1, {
      message: "Stock uom id is required",
    })
    .transform((arg) => new Number(arg)),
  status: z
    .string()
    .min(1, {
      message: "Stock status is required",
    })
    .default("Available"),
});

export default function StockForm({ setDialogOpen, stock, uoms }: any) {
  const [isPending, startTransition] = useTransition();
  const { updateStock } = useMainStocks();
  const form = useForm<z.infer<typeof stocksSchema>>({
    resolver: zodResolver(stocksSchema),
    defaultValues: {
      id: stock.id,
      name: stock.name,
      description: stock.description,
      image_url: stock.image_url,
      category: stock.category,
      uom_id: stock.uoms.id.toString(),
      stock_quantity: stock.stock_quantity,
      price: stock.price,
      status: stock.status,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await updateStock(data, 5000);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }

      sonner("UPDATED", {
        description: `Stock Updated!`,
      });
      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex flex-col min-h-[300px]">
          <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex justify-center place-items-center gap-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem className="h-fit">
                    <FormControl>
                      <ImageInput data={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Stock Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-lg  border-slate-600/50"
                            {...field}
                            type="text"
                            placeholder="Stock name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-4">
                  <div className="w-full flex flex-col ">
                    <FormField
                      control={form.control}
                      name="uom_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Unit Of Measure
                          </FormLabel>
                          <FormControl>
                            <UomInput data={field} uoms={uoms} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <FormField
                      control={form.control}
                      name="stock_quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Quantity</FormLabel>
                          <div className="w-full flex justify-between place-items-center gap-2">
                            <div
                              className=" p-3 rounded-lg cursor-pointer group hover:bg-applicationPrimary transition-all duration-300 text-center select-none border border-slate-600/50"
                              onClick={() => {
                                form.setValue(
                                  "stock_quantity",
                                  form.getValues("stock_quantity") - 10
                                );
                              }}
                            >
                              <FiMinus className="group-hover:text-black" />
                            </div>
                            <FormControl>
                              <Input
                                className="rounded-lg w-12 border-slate-600/50 text-center text-sm"
                                {...field}
                                type="number"
                                placeholder="0"
                              />
                            </FormControl>
                            <div
                              className=" p-3 rounded-lg cursor-pointer group hover:bg-applicationPrimary transition-all duration-300 text-center select-none border border-slate-600/50"
                              onClick={() => {
                                form.setValue(
                                  "stock_quantity",
                                  form.getValues("stock_quantity") + 10
                                );
                              }}
                            >
                              <IoMdAdd className="group-hover:text-black" />
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Price</FormLabel>
                      <div className="w-full flex place-items-center rounded-lg border border-slate-600/50 ">
                        <div className="h-full px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
                          <TbCurrencyPeso className="h-full w-5 text-center" />
                        </div>
                        <FormControl>
                          <Input
                            className="w-full text-start bg-transparent border-none rounded-tr-lg rounded-br-lg"
                            {...field}
                            type="number"
                            placeholder="0.00"
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full ">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">category</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg  border-slate-600/50"
                        {...field}
                        type="text"
                        placeholder="Enter category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <Textarea
                      className=" border-slate-600/50 w-full h-full resize-none"
                      placeholder="Description"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Update Stock</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
