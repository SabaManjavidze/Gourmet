"use client";
import type { Dispatch } from "react";
import React, { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputSchema } from "./utils";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Capitalize, cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { Modal } from "@/components/ui/modal";
import { NameInputs } from "./name-inputs";
import { OrderFormType, orderNowSchema } from "./utils";
import { DatePickerForm } from "./date-picker-form";
import { useMenu } from "@/hooks/useMenu";
import { TimePickerForm } from "../ui/time-picker/form";
import { Checkbox } from "../ui/checkbox";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useCatering } from "@/hooks/useCatering";
import { productState } from "menu";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { OrderMadeEmail } from "@/server/api/nodemailer";
import { useSession } from "next-auth/react";
import { PaymentModal } from "../payment-modal/payment-modal";

const titleClass =
  "text-lg whitespace-nowrap font-bold text-accent-foreground max-sm:text-base";
export function OrderNowModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const { currMenu } = useCatering();
  const { status } = useSession();
  const { menu, totalSum } = useMenu();
  const [data, setData] = useState<OrderFormType>();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { isPending: detailsPending, mutateAsync: createOrderDetails } =
    api.orderDetails.createOrderDetails.useMutation();
  const { isPending: orderPending, mutateAsync: createOrder } =
    api.order.createUserOrder.useMutation();
  const form = useForm<OrderFormType>({
    resolver: zodResolver(orderNowSchema),
    defaultValues: {
      firstname: "",
      firstname2: "",
      email: "",
      phone: "",
      phone2: "",
      lastname: "",
      lastname2: "",
      companyEmail: "",
      companyName: "",
      address: "",
      extraInfo: "",
    },
  });
  const saveToDB = async (payId?: string) => {
    if (
      !data ||
      !currMenu ||
      menu[currMenu.name] == undefined
      // || !session?.user?.name ||
      // !session.user.email
    ) {
      console.log({ currMenu: data });
      return;
    }
    const order = await createOrder({
      invoiceRequested: data.invoiceRequested ?? false,
      menuName: currMenu.name,
      products: menu[currMenu.name] as productState[],
      status: data.invoiceRequested ? "submitted" : "loading",
      totalPrice: totalSum.toString(),
      orderDetails: data,
      payId,
    });
    // if (status == "authenticated") {
    await createOrderDetails({
      ...data,
      orderId: order.id,
    });
    // }
    toast.success("Order was successful");
  };
  const onSubmit = async (data: OrderFormType) => {
    if (data.invoiceRequested) {
      await saveToDB();
      toast.success("შეკვეთა მიღებულია. ჩვენი გუნდი დაგეკონთაქტებათ მალე.", {
        duration: 2500,
      });
      closeModal();
    } else {
      setData(data);
      setPaymentOpen(true);
    }
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className={`h-[80vh] w-[70%] ${orderPending || detailsPending ? "overflow-hidden" : "overflow-y-auto"}
         max-sm:w-[95%]`}
    >
      <PaymentModal
        closeModal={() => setPaymentOpen(false)}
        open={paymentOpen}
        saveToDB={saveToDB}
      />
      <div
        className={`absolute inset-0 z-10 items-center justify-center bg-gray-300/50
      ${orderPending || detailsPending ? "flex" : "hidden"}`}
      >
        <Loader2 color="black" size={25} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err);
          })}
          className="relative flex flex-col items-center justify-center px-14 py-4 
          max-sm:px-0 "
        >
          <div
            className="flex w-full items-center justify-between gap-x-12 max-xl:flex-col
          max-xl:justify-center max-xl:gap-x-0 max-xl:gap-y-12"
          >
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-y-24
            max-xl:gap-y-12"
            >
              <div className="flex w-full flex-col items-center justify-center gap-y-7">
                <h3 className={titleClass}>მთავარი საკონტაქტო ინფორმაცია</h3>
                {/* <h3 className={titleClass}>Primary Contact Information</h3> */}
                {InputSchema["Primary Contact Information"].map((item) => {
                  if (!item?.name) {
                    return (
                      <NameInputs
                        key={item.title}
                        title={item.title}
                        control={form.control}
                      />
                    );
                  }
                  return (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex items-center justify-between">
                            <FormLabel>{item.title}</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="text-md w-full rounded-sm py-2"
                              placeholder={item.title.toLowerCase()}
                              type={item.type ?? "text"}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
              <div className="flex w-full flex-col gap-y-7">
                <h3 className={titleClass}>მიწოდების ინფორმაცია</h3>
                {InputSchema["Delivery Information"].map((item) => {
                  if (!item?.name) {
                    return (
                      <DateInputs
                        key={item.title}
                        control={form.control}
                        title={item.title}
                      />
                    );
                  }
                  return (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex items-center justify-between">
                            <FormLabel>{item.title}</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            {item.name == "extraInfo" ? (
                              <Textarea
                                className="text-md w-full rounded-sm py-2"
                                placeholder={item.title.toLowerCase()}
                                {...field}
                              />
                            ) : (
                              <Input
                                className="text-md w-full rounded-sm py-2"
                                placeholder={item.title.toLowerCase()}
                                type={item?.type ?? "text"}
                                {...field}
                              />
                            )}
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <div
              className="flex h-full w-full flex-col items-center justify-center
            gap-y-24 max-xl:gap-y-12"
            >
              <div className="flex w-full flex-col items-center justify-center gap-y-7">
                <h3 className={titleClass}>
                  მეორე საკონტაქტო ინფორმაცია (სურვილისამებრ)
                </h3>
                {InputSchema["Secondary Contact Information (Optional)"].map(
                  (item) => {
                    if (!item?.name) {
                      return (
                        <NameInputs
                          key={item.title + "2"}
                          title={item.title}
                          version="2"
                          control={form.control}
                        />
                      );
                    }
                    return (
                      <FormField
                        key={item.name + "2"}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center justify-between">
                              <FormLabel>{item.title}</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                className="text-md w-full rounded-sm py-2"
                                placeholder={item.title.toLowerCase()}
                                type={item.type ?? "text"}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );
                  },
                )}
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-y-7">
                <h3 className={titleClass}>
                  კომპანიის ინფორმაცია (სურვილისამებრ)
                </h3>
                {InputSchema["Company Information (Optional)"].map((item) => {
                  return (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex items-center justify-between">
                            <FormLabel>{item.title}</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="text-md rounded-sm py-2"
                              placeholder={
                                item?.placeholder ?? item.title.toLowerCase()
                              }
                              type={item?.type ?? "text"}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-y-1">
            <h2 className="text-lg font-bold">მთლიანი ფასი</h2>
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-bold text-muted-foreground">
                ₾{totalSum}
              </h3>
              <FormField
                control={form.control}
                name="invoiceRequested"
                render={({ field }) => (
                  <FormItem
                    className="flex flex-row items-start space-x-3 space-y-0 
                  rounded-md"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>მოგვიანებით გადახდა</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center py-5">
            <Button
              disabled={orderPending || detailsPending}
              isLoading={orderPending || detailsPending}
              type="submit"
              variant={"accent"}
              size={"lg"}
              className="text-base"
            >
              გადახდაზე გადასვლა
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
export function DateInputs({
  control,
  title,
}: {
  control: any;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="flex items-end justify-between gap-x-4">
        <DatePickerForm name={"date"} control={control} />
        <TimePickerForm name={"time"} control={control} />
      </div>
    </div>
  );
}
