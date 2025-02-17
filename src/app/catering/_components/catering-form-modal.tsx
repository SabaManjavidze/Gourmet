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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { MAX_PERSON_CATER, MIN_PERSON_CATER } from "@/lib/constants";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const drinksArr = [
  "წყალი 0.5",
  "აპარატის ყავა",
  "ნატურალური წვენი",
  "არ მსურს სასმელი",
];
export const cateringFormSchema = z.object({
  type: z.enum(["cheap", "standard", "expensive"]),
  personRange: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(10).max(50))
    .transform((year) => year.toString()),
  assistance: z.enum(["კი", "არა"]),
  plates: z.enum(["ერთჯერადი", "ფაიფურის", "ჭურჭლის გარეშე"]),
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
  menuName,
}: {
  open: boolean;
  menuName: string;
  closeModal: () => void;
  onSubmit: (data: cateringFormType) => void;
}) {
  const [formIdx, setFormIdx] = useState(0);
  const [showOver50, setShowOver50] = useState(false);
  const router = useRouter();
  const form = useForm<cateringFormType>({
    resolver: zodResolver(cateringFormSchema),
    defaultValues: {
      personRange: "10",
      drinks: [],
    },
    mode: "onSubmit",
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
          className="relative flex flex-col items-center justify-center px-14 max-lg:px-5"
        >
          <div className="flex w-full items-center justify-center gap-x-12">
            <div className="flex h-full flex-col items-center justify-center gap-y-24">
              <div className="flex w-full flex-col justify-center gap-y-7">
                <div
                  className={`${formIdx !== 0 ? "hidden" : "flex"} flex-col justify-start`}
                >
                  <h3 className="text-center text-xl font-semibold">
                    შეარჩიეთ სასურველი პაკეტი:
                  </h3>
                  <FormField
                    control={form.control}
                    name={"personRange"}
                    render={({ field }) => (
                      <FormItem className="mt-5 flex w-auto items-center justify-between">
                        <div className="flex gap-x-4">
                          <div className="flex items-center">
                            <FormLabel className="text-lg max-lg:text-base">
                              ხალხის რაოდენობა:
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                const val = e.currentTarget.value;
                                const q = Number(val);
                                if (q >= MAX_PERSON_CATER) {
                                  setShowOver50(true);
                                  return;
                                } else {
                                  setShowOver50(false);
                                }
                                // if (val == "" || q < MIN_PERSON_CATER) {
                                //   val = "0";
                                // }
                                // if (isNaN(q)) return;
                                field.onChange(val && q.toString());
                              }}
                              type="number"
                              className="h-8 w-16 rounded-[3px] border-accent text-base"
                            />
                          </FormControl>
                        </div>
                        {showOver50 ? (
                          <Button
                            variant={"outline-accent"}
                            type="button"
                            onClick={() => {
                              closeModal();
                              form.control._reset();
                              router.push("/catering#custom-catering", {
                                scroll: true,
                              });
                              setShowOver50(false);
                            }}
                            className="rounded-xl text-foreground"
                          >
                            50+ კაციანი ფურშეტისთვის დაგვეკონტაქტეთ.
                          </Button>
                        ) : null}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"type"}
                    render={({ field }) => (
                      <FormItem
                        className="mt-3 flex flex-col items-center space-y-8
                      pb-16"
                      >
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col items-center space-y-5 *:w-full
                            max-md:items-start"
                          >
                            <FormItem className="flex items-start space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="expensive"
                                  className="mt-2"
                                />
                              </FormControl>
                              <FormLabel className="text-lg font-normal max-lg:text-base">
                                <p className="font-semibold">
                                  გასტრონომიური შედევრი
                                </p>
                                <p className="text-base">
                                  გამორჩეული მენიუ მოიცავს კერძებისა და
                                  სასმელების ფართო ასორტიმენტს, თქენს კომფორტზე
                                  კი გურმეს პროფესიონალური მომსახურე პერსონალი
                                  იზრუნებს. აჩუქეთ თქვენს სტუმრებს უნიკალური
                                  გასტრონომიული გამოცდილება.
                                </p>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="standard"
                                  className="mt-2"
                                />
                              </FormControl>
                              <FormLabel className="text-lg font-normal max-lg:text-base">
                                <p className="font-semibold">სტანდარტული</p>
                                <p className="text-base">
                                  “გურმეს” სტანდარტული მენიუ იდეალურია
                                  ყველანაირი ღონისძიებისთვის, მათ შორის,
                                  კორპორაციული წვეულებებისთვის, ოჯახური
                                  დღესასწაულების ან ვორქშოფებისთვის.
                                </p>
                              </FormLabel>
                            </FormItem>
                            {menuName !== "ყავის შესვენება" ? (
                              <FormItem className="flex items-start space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="cheap"
                                    className="mt-2"
                                  />
                                </FormControl>
                                <FormLabel className="text-lg font-normal max-lg:text-base">
                                  <p className="font-semibold">ეკონომიური</p>
                                  <p className="text-base">
                                    ეკონომიური მენიუ გათვლილია მცირე ბიუჯეტზე და
                                    მოიცავს მსუბუქ წასახემსებელს.
                                  </p>
                                </FormLabel>
                              </FormItem>
                            ) : null}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
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
                        <p className="underline">
                          გსურთ “გურმეს” პერსონალის მომსახურეობა?
                        </p>
                        <p className="mt-2 text-sm">
                          „გურმეს“ პერსონალის მომსახურება გულისხმობს გუნდს,
                          რომელიც, მოიტანს კერძებსა და ინვენტარს, ლამაზად
                          გააწყობს ფურშეტს, დაელოდება ღონისძიების დასრულებას და
                          შემდეგ აალაგებს მაგიდებს. უარის მონიშვნის შემთხვევაში,
                          შეკვეთას მიიღებთ შესაფუთი ყუთებით, პერსონალისა და
                          ინვენტარის გარეშე.
                        </p>
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
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ჭურჭლის გარეშე" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal max-md:text-base">
                              ჭურჭლის გარეშე
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
          <div className="absolute bottom-0 right-1/2 flex translate-x-1/2 justify-center gap-x-7 pb-3 pt-5">
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
              type={"button"}
              variant={"accent"}
              // size={"lg"}
              className="h-10 w-auto rounded-[3px] text-base max-lg:h-9 max-lg:text-sm"
              onClick={async () => {
                if (formIdx == formItemLength) {
                  await form.handleSubmit(onSubmitForm, (err) => {
                    toast.error("ფორმა არ არის ვალიდური.");
                    console.log(err);
                  })();
                  return;
                }
                if (formIdx == 0) {
                  const validation = await form.trigger("personRange");
                  if (!validation) {
                    toast.error("ადამიანების რაოდენობა უნდა იყოს 10-ზე მეტი.");
                    return;
                  }
                }
                setFormIdx((prev) =>
                  prev <= formItemLength ? prev + 1 : prev,
                );
              }}
            >
              {formIdx == formItemLength ? "დადასტურება" : "წინ"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
