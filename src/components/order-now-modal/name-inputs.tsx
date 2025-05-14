"use client";
import { Input } from "@/components/ui/input";
import {
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

type NameInputsProps = {
  control: any;
  title: string;
  version?: string;
};
export function NameInputs({ control, title, version = "" }: NameInputsProps) {
  const t = useTranslations("Order Modal");
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-sm font-semibold">{t(title)}</h3>
      <div
        className="flex justify-between gap-x-4 max-md:flex-col max-sm:w-full
      max-sm:flex-col max-sm:items-center max-sm:justify-center"
      >
        <FormField
          control={control}
          name={"firstname" + version}
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between">
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  {...field}
                  className="text-md w-full rounded-sm py-2"
                  placeholder={t("სახელი")}
                  // defaultValue={defaultFirst}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"lastname" + version}
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between">
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  {...field}
                  className="text-md w-full rounded-sm py-2"
                  placeholder={t("გვარი")}
                  // defaultValue={defaultLast}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
