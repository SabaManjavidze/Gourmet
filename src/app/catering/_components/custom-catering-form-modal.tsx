import React, { Dispatch, SetStateAction, useState } from "react";
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
import { Capitalize, cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { Modal } from "@/components/ui/modal";
import { useMenu } from "@/hooks/useMenu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MenuVariants } from "@/lib/types";
import { useCatering } from "@/hooks/useCatering";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerForm } from "@/components/order-now-modal/date-picker-form";
const eventTypes = [
  "Corporate",
  "Wedding",
  "Private Party",
  "Festival",
  "Other",
] as const;
const formSchema = z.object({
  type: z.enum(eventTypes),
  eventDetails: z.string(),
  numberOfGuests: z.string(),
  dateOfEvent: z.date(),
});
type formType = z.infer<typeof formSchema>;
export function CustomCateringFormModal({
  open,
  closeModal,
  // onSubmit,
}: {
  open: boolean;
  closeModal: () => void;
  // onSubmit: (data: { personRange: number; menuType: MenuVariants }) => void;
}) {
  const [selectedType, setSelecteType] = useState<
    undefined | (typeof eventTypes)[number]
  >();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfGuests: "",
    },
  });

  const onSubmitForm = async (data: formType) => {
    if (!data) return;
    closeModal();
    // onSubmit({ menuType: data.type, personRange: Number(data.personRange) });
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      title=""
      className="max-h-[90%] w-1/2 overflow-y-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm, (err) => {
            console.log(err);
          })}
          className="relative flex flex-col items-center justify-center px-14 py-4"
        >
          <div className="flex w-full items-center justify-center gap-x-12">
            <div className="flex h-full flex-col items-center justify-center gap-y-24">
              <div className="flex w-full flex-col justify-center gap-y-7">
                <div className="flex flex-col items-center justify-center">
                  <FormLabel className="text-lg font-bold">
                    Event Details
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
                          className="text-md w-full rounded-sm"
                          placeholder={"Type Here..."}
                          {...field}
                          defaultValue={""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col items-center justify-center">
                  <FormLabel className="text-lg font-bold">
                    Event Type
                  </FormLabel>
                </div>
                <ul className="flex w-full items-center gap-x-10">
                  {eventTypes.map((item) => (
                    <li key={item} className="flex items-center gap-x-3">
                      <Checkbox
                        id={item}
                        className="rounded-[3px]"
                        checked={selectedType && selectedType == item}
                        onCheckedChange={(checked) => {
                          if (checked && selectedType !== item) {
                            setSelecteType(item);
                          } else if (!checked && selectedType == item) {
                            setSelecteType(undefined);
                          }
                        }}
                      />
                      <label
                        htmlFor={item}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>

                <div className="flex w-full items-center justify-center">
                  <FormField
                    control={form.control}
                    name={"numberOfGuests"}
                    render={({ field }) => (
                      <FormItem className="flex w-full justify-between">
                        <div className="flex items-center justify-between">
                          <h3
                            className="w-full text-base font-bold 
              max-xl:text-lg max-md:text-base max-sm:text-xs"
                          >
                            Please Enter Number of Guests
                          </h3>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
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
              max-xl:text-lg max-md:text-base max-sm:text-xs"
                  >
                    Date Of Event
                  </h3>
                  <div className="">
                    <DatePickerForm
                      className="h-8 w-40 rounded-[3px] border-accent"
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
            >
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
