import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerForm } from "@/components/order-now-modal/date-picker-form";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  eventTypes,
  customCateringFormType,
  customCateringSchema,
  priceTypes,
  priceObj,
} from "../utils";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";

export function CustomCateringFormModal({
  open,
  closeModal,
  // onSubmit,
}: {
  open: boolean;
  closeModal: () => void;
  // onSubmit: (data: { personRange: number; menuType: MenuVariants }) => void;
}) {
  const g = useTranslations("General");
  const t = useTranslations("Custom Catering");
  const { status, data: session } = useSession();
  const { mutateAsync: orderCustomCatering, isPending } =
    api.order.orderCustomCatering.useMutation();
  const [selectedType, setSelecteType] = useState<
    undefined | (typeof eventTypes)[number]
  >();
  const form = useForm<customCateringFormType>({
    resolver: zodResolver(customCateringSchema),
    defaultValues: {
      numberOfGuests: "",
      phone: "",
    },
  });

  const onSubmitForm = async (data: customCateringFormType) => {
    if (!data) return;
    await orderCustomCatering({
      data,
    });
    toast.success("შეკვეთა მიღებულია. ჩვენი გუნდი მალე დაგექონტაქტებათ.");
    closeModal();
    // onSubmit({ menuType: data.type, personRange: Number(data.personRange) });
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      title=""
      className="max-h-[90%] w-3/5 overflow-y-auto max-xl:w-4/5 max-sm:w-[95%]"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm, (err) => {
            console.log(err);
          })}
          className="relative flex flex-col items-center justify-center px-14 py-4
          max-lg:px-2"
        >
          <div className="flex w-full items-center justify-center gap-x-12">
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-24">
              <div className="flex w-full flex-col justify-center gap-y-7">
                <div className="flex flex-col items-center justify-center">
                  <FormLabel className="text-lg font-bold">
                    {t("details title")}
                  </FormLabel>
                </div>
                <FormField
                  control={form.control}
                  name={"eventDetails"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex items-center justify-between">
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Textarea
                          className="text-md w-full rounded-sm placeholder:text-sm"
                          placeholder={t("details placeholder")}
                          {...field}
                          defaultValue={""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"priceRange"}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center space-y-8 py-8">
                      <FormLabel className="text-lg font-bold">
                        {t("buffet pricerange")}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center max-md:flex-col max-md:items-start"
                        >
                          {priceTypes.map((item) => (
                            <FormItem
                              key={item}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={item} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <TooltipProvider>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <p className="text-base">
                                        {g(priceObj[item].title)}
                                      </p>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-60">
                                      <p>{priceObj[item].desc}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"type"}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center space-y-8 py-8">
                      <FormLabel className="text-lg font-bold">
                        {t("buffet type")}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center max-md:flex-col max-md:items-start"
                        >
                          {eventTypes.map((item, idx) => (
                            <FormItem
                              key={item}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={item} />
                              </FormControl>
                              <FormLabel className="text-base font-normal">
                                {t("btype" + (idx + 1))}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {status !== "authenticated" ? (
                  <FormField
                    control={form.control}
                    name={"userEmail"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center justify-between">
                          <FormLabel className="w-full text-base font-bold">
                            თქვენი იმეილი
                          </FormLabel>
                          <FormMessage />
                          <FormControl>
                            <Input
                              {...field}
                              className="text-md w-full rounded-sm py-2"
                              placeholder={"იმეილი"}
                              type={"email"}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                ) : null}

                <FormField
                  control={form.control}
                  name={"phone"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex items-center justify-between">
                        <FormLabel>{g("phone")}</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-md w-full rounded-sm py-2"
                          placeholder={"+995-"}
                          type={"number"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex w-full items-center justify-center">
                  <FormField
                    control={form.control}
                    name={"numberOfGuests"}
                    render={({ field }) => (
                      <FormItem className="flex w-full justify-between">
                        <div className="flex items-center justify-between">
                          <h3
                            className="w-full text-base font-bold 
              max-xl:text-lg max-md:text-base max-sm:text-sm"
                          >
                            {g("people amount")}
                          </h3>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            // datatype="number"
                            className="ml-4 h-8 w-16 rounded-[3px] border-accent text-base"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <h3
                    className="w-full text-base font-bold 
              max-xl:text-lg max-md:text-base max-sm:text-sm"
                  >
                    {g("buffet date")}
                  </h3>
                  <div className="">
                    <DatePickerForm
                      className="h-8 w-40 rounded-[3px] border-accent"
                      placeholder={g("choose date")}
                      name={"dateOfEvent"}
                      control={form.control}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-5">
            <Button
              type="submit"
              variant={"accent"}
              size={"lg"}
              className="text-base"
              isLoading={isPending}
              disabled={isPending}
            >
              {g("submit")}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
