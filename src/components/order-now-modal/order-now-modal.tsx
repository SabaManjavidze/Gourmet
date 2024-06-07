"use client";
import type { Dispatch } from "react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
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

export function OrderNowModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  //   const trpc = api.useContext();
  //   const { mutateAsync: addShippingAddress, isLoading } =
  //     api.address.addShippingAddress.useMutation({
  //       onSuccess() {
  //         trpc.address.getUserAddress.invalidate();
  //       },
  //     });
  const { totalSum } = useMenu();
  const form = useForm<OrderFormType>({
    resolver: zodResolver(orderNowSchema),
  });

  const onSubmit = async (data: OrderFormType) => {
    if (!data) return;
    closeModal();
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      title="Contact Information"
      className="w-3/5"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => {
            console.log(err);
          })}
          className="relative flex flex-col items-center justify-center px-14 py-4"
        >
          <div className="flex w-full items-center justify-between gap-x-12">
            <div className="flex h-full flex-col items-center justify-start gap-y-24">
              <div className="flex flex-col gap-y-7">
                <h3 className="text-lg font-bold text-accent-foreground">
                  Primary Contact Information
                </h3>
                {InputSchema["Primary Contact Information"].map((item) => {
                  if (!item?.name) {
                    return (
                      <NameInputs
                        key={nanoid()}
                        title={item.title}
                        control={form.control}
                      />
                    );
                  }
                  return (
                    <FormField
                      key={item.title}
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
                              className="text-md w-full rounded-sm py-2"
                              placeholder={item.title}
                              type={item.type ?? "text"}
                              {...field}
                              defaultValue={""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
              <div className="flex w-full flex-col gap-y-7">
                <h3 className="text-lg font-bold text-accent-foreground">
                  Delivery Information
                </h3>
                {InputSchema["Delivery Information"].map((item) => {
                  if (!item?.name) {
                    return (
                      <DateInputs
                        key={nanoid()}
                        control={form.control}
                        title={item.title}
                      />
                    );
                  }
                  return (
                    <FormField
                      key={item.title}
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
                              className="text-md w-full rounded-sm py-2"
                              placeholder={item.title}
                              type={item?.type ?? "text"}
                              {...field}
                              defaultValue={""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex h-full flex-col items-center justify-start gap-y-24">
              <div className="flex flex-col gap-y-7">
                <h3 className="text-lg font-bold text-accent-foreground">
                  Secondary Contact Information (Optional)
                </h3>
                {InputSchema["Secondary Contact Information (Optional)"].map(
                  (item) => {
                    if (!item?.name) {
                      return (
                        <NameInputs
                          key={nanoid()}
                          title={item.title}
                          control={form.control}
                        />
                      );
                    }
                    return (
                      <FormField
                        key={nanoid()}
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
                                className="text-md w-full rounded-sm py-2"
                                placeholder={item.title}
                                type={item.type ?? "text"}
                                {...field}
                                defaultValue={""}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );
                  },
                )}
              </div>
              <div className="flex w-full flex-col gap-y-7">
                <h3 className="text-lg font-bold text-accent-foreground">
                  Company Information (Optional)
                </h3>
                {InputSchema["Company Information (Optional)"].map((item) => {
                  return (
                    <FormField
                      key={item.title}
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
                              className="text-md w-full rounded-sm py-2"
                              placeholder={item.title}
                              type={item?.type ?? "text"}
                              {...field}
                              defaultValue={""}
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
            <h2 className="text-lg font-bold">Total Price</h2>
            <h3 className="text-lg font-bold text-muted-foreground">
              ${totalSum}
            </h3>
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              type="submit"
              variant={"accent"}
              size={"lg"}
              className="text-base"
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
function DateInputs({ control, title }: { control: any; title: string }) {
  return (
    <div className="flex flex-col justify-center">
      <FormLabel>{title}</FormLabel>
      <div className="flex items-end justify-between gap-x-4">
        <DatePickerForm name={"date"} control={control} />
        <TimePickerForm name={"time"} control={control} />
      </div>
    </div>
  );
}
