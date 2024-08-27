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

const titleClass = "text-lg whitespace-nowrap font-bold text-accent-foreground";
const cateringFormSchema = z.object({
  type: z.enum(["cheap", "standard", "expensive"]),
  personRange: z.string(),
});
type cateringMenuFormType = z.infer<typeof cateringFormSchema>;
export function CateringFormModal({
  open,
  closeModal,
  onSubmit,
}: {
  open: boolean;
  closeModal: () => void;
  onSubmit: (data: { personRange: number; menuType: MenuVariants }) => void;
}) {
  const form = useForm<cateringMenuFormType>({
    resolver: zodResolver(cateringFormSchema),
  });

  const onSubmitForm = async (data: cateringMenuFormType) => {
    if (!data) return;
    closeModal();
    onSubmit({ menuType: data.type, personRange: Number(data.personRange) });
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      title="Please Tell Us What You Need"
      className="max-h-[90%] w-3/5 overflow-y-auto"
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
                <FormField
                  control={form.control}
                  name={"type"}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center space-y-8 py-8">
                      <FormLabel className="text-xl">Menu Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cheap" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              Cheap
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              Standard
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="expensive" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              Expensive
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
                    <FormItem className="flex flex-col items-center space-y-8 py-8">
                      <FormLabel className="text-xl">Person Range</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field?.value?.toString() ?? 10}
                          className="flex items-center"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="10" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              10
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="20" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              20
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="30" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              30
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="40" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              40
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="50" />
                            </FormControl>
                            <FormLabel className="text-lg font-normal">
                              50
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
