"use client";
import { Input } from "@/components/ui/input";
import {
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

type NameInputsProps = {
  control: any;
  title: string;
  version?: string;
};
export function NameInputs({ control, title, version = "" }: NameInputsProps) {
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div
        className="flex justify-between gap-x-4 max-sm:w-full max-sm:flex-col
      max-sm:items-center max-sm:justify-center"
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
                  placeholder={"სახელი"}
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
                  placeholder={"გვარი"}
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
