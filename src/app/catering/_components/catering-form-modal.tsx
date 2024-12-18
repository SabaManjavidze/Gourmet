import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Modal } from "@/components/ui/modal";
import { useMenu } from "@/hooks/useMenu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MenuVariants } from "@/lib/types";
import { useCatering } from "@/hooks/useCatering";
import { Input } from "@/components/ui/input";
import { MIN_PERSON_CATER } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const drinksArr = [
  "წყალი",
  "აპარატის ყავა",
  "ნატურალური წვენი",
  "არ მსურს სასმელი",
];
export const cateringFormSchema = z.object({
  type: z.enum(["cheap", "standard", "expensive"]),
  personRange: z.string(),
  assistance: z.enum(["კი", "არა"]),
  plates: z.enum(["ერთჯერადი", "ფაიფურის"]),
  drinks: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export type cateringFormType = z.infer<typeof cateringFormSchema>;
const formItemLength = 3;
export function CateringFormModal({
  open,
  closeModal,
  onSubmit,
}: {
  open: boolean;
  closeModal: () => void;
  onSubmit: (data: cateringFormType) => void;
}) {
  const [formIdx, setFormIdx] = useState(0);
  const form = useForm<cateringFormType>({
    resolver: zodResolver(cateringFormSchema),
    defaultValues: {
      personRange: "10",
      drinks: [],
    },
  });

  const onSubmitForm = async (data: cateringFormType) => {
    if (!data) return;
    closeModal();
    onSubmit(data);
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      // title="Please Tell Us What You Need"
      className="max-h-[90%] min-h-[75%] w-3/5 overflow-y-auto max-xl:w-4/5 max-sm:w-[95%]"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm, (err) => {
            toast.error(JSON.stringify(err));
            console.log(err);
          })}
          // onError={(error) => {
          //   console.log(error);
          //   toast.error(JSON.stringify(error));
          // }}
          className="relative flex flex-col items-center justify-center px-14 py-4 max-lg:px-10"
        >
          <div className="flex w-full items-center justify-center gap-x-12">
            <div className="flex h-full flex-col items-center justify-center gap-y-24">
              <div className="flex w-full flex-col justify-center gap-y-7">
                <div hidden={formIdx != 0}>
                  <FormField
                    control={form.control}
                    name={"type"}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center space-y-8 py-8">
                        <FormLabel className="text-xl">
                          შეარჩიეთ სასურველი პაკეტი:
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center max-md:flex-col max-md:items-start"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="cheap" />
                              </FormControl>
                              <FormLabel className="text-lg font-normal max-lg:text-base">
                                <TooltipProvider>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <p>ეკონომიური</p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-60">
                                        ეკონომიური მენიუ გათვლილია მცირე
                                        ბიუჯეტზე და მოიცავს მსუბუქ
                                        წასახემსებელს.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="standard" />
                              </FormControl>
                              <FormLabel className="text-lg font-normal max-lg:text-base">
                                <TooltipProvider>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <p>სტანდარტული</p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-60">
                                        “გურმეს” სტანდარტული მენიუ იდეალურია
                                        ყველანაირი ღონისძიებისთვის, მათ შორის,
                                        კორპორაციული წვეულებებისთვის, ოჯახური
                                        დღესასწაულების ან ვორქშოფებისთვის.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="expensive" />
                              </FormControl>
                              <FormLabel className="text-lg font-normal max-lg:text-base">
                                <TooltipProvider>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <p>გასტრონომიური შედევრი</p>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200]">
                                      <p className="max-w-60">
                                        გამორჩეული მენიუ მოიცავს კერძებისა და
                                        სასმელების ფართო ასორტიმენტს, თქენს
                                        კომფორტზე კი გურმეს პროფესიონალური
                                        მომსახურე პერსონალი იზრუნებს. აჩუქეთ
                                        თქვენს სტუმრებს უნიკალური გასტრონომიული
                                        გამოცდილება.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"personRange"}
                    render={({ field }) => (
                      <FormItem className="flex w-full items-center justify-center gap-x-4">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-lg max-lg:text-base">
                            ხალხის რაოდენობა:
                          </FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              let val = e.currentTarget.value;
                              const q = parseInt(val);
                              if (val == "" || q < MIN_PERSON_CATER) {
                                val = "0";
                              }
                              if (isNaN(q)) return;
                              field.onChange(q.toString());
                            }}
                            type="number"
                            min={MIN_PERSON_CATER}
                            max={50}
                            className="h-8 w-16 rounded-[3px] border-accent text-base"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={"assistance"}
                  render={({ field }) => (
                    <FormItem
                      className={`${formIdx !== 1 ? "hidden" : "flex"} flex-col items-center space-y-8
                    py-8`}
                    >
                      <FormLabel className="text-center text-xl">
                        {/* <TooltipProvider> */}
                        {/* <Tooltip> */}
                        {/* <TooltipTrigger asChild> */}
                        <p className="underline">
                          გსურთ “გურმეს” პერსონალის მომსახურეობა?
                        </p>
                        {/* </TooltipTrigger> */}
                        {/* <TooltipContent className="w-72"> */}
                        <p className="mt-2 text-sm">
                          „გურმეს“ პერსონალის მომსახურება გულისხმობს გუნდს,
                          რომელიც, მოიტანს კერძებსა და ინვენტარს, ლამაზად
                          გააწყობს ფურშეტს, დაელოდება ღონისძიების დასრულებას და
                          შემდეგ აალაგებს მაგიდებს. უარის მონიშვნის შემთხვევაში,
                          შეკვეთას მიიღებთ შესაფუთი ყუთებით, პერსონალისა და
                          ინვენტარის გარეშე.
                        </p>
                        {/* </TooltipContent> */}
                        {/* </Tooltip> */}
                        {/* </TooltipProvider> */}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="კი" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              კი
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="არა" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              არა
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"plates"}
                  render={({ field }) => (
                    <FormItem
                      className={`${formIdx !== 2 ? "hidden" : "flex"} flex-col items-center space-y-8
                    py-8`}
                    >
                      <FormLabel className="text-xl max-md:text-base">
                        შეარჩიეთ ჭურჭლის ტიპი:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ერთჯერადი" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal max-md:text-base">
                              ერთჯერადი
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ფაიფურის" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal max-md:text-base">
                              ფაიფურის
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="drinks"
                  render={() => (
                    <FormItem
                      className={`${formIdx !== 3 ? "hidden" : "flex"} flex-col items-center space-y-8
                    py-8`}
                    >
                      <FormLabel className="text-xl">
                        შეარჩიეთ სასმელები:
                      </FormLabel>
                      <div className="flex items-center gap-x-3 max-lg:flex-col max-lg:items-start">
                        {drinksArr.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="drinks"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange(
                                              item == "არ მსურს სასმელი"
                                                ? [item]
                                                : [
                                                    ...field.value.filter(
                                                      (item) =>
                                                        item !==
                                                        "არ მსურს სასმელი",
                                                    ),
                                                    item,
                                                  ],
                                            )
                                          : field.onChange(
                                              field.value?.filter(
                                                (value: string) =>
                                                  value !== item,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    className="text-lg font-normal 
                                  max-sm:text-base"
                                  >
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-x-7 pb-3 pt-5">
            <Button
              type="button"
              variant={"accent"}
              // size={"lg"}
              disabled={formIdx == 0}
              className="h-10 w-20 rounded-[3px] text-base max-lg:h-9 max-lg:w-16 max-lg:text-sm"
              onClick={() => setFormIdx((prev) => (prev > 0 ? prev - 1 : prev))}
            >
              უკან
            </Button>
            <Button
              type="button"
              variant={"accent"}
              // size={"lg"}
              disabled={formIdx >= formItemLength}
              className="h-10 w-20 rounded-[3px] text-base max-lg:h-9 max-lg:w-16 max-lg:text-sm"
              onClick={() =>
                setFormIdx((prev) => (prev < formItemLength ? prev + 1 : prev))
              }
            >
              წინ
            </Button>
          </div>
          <Button
            type="submit"
            variant={"accent"}
            // size={"lg"}
            className="rounded-[3px] text-base max-lg:text-sm"
          >
            დადასტურება
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
