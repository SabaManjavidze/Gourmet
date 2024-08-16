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
  defaultFirst?: string;
  defaultLast?: string;
  title: string;
};
export function NameInputs({
  control,
  title,
  defaultFirst = "",
  defaultLast = "",
}: NameInputsProps) {
  return (
    <div className="flex flex-col">
      <FormLabel>{title}</FormLabel>
      <div className="flex justify-between gap-x-4">
        <FormField
          control={control}
          name={"firstname"}
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between">
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="text-md w-full rounded-sm py-2"
                  placeholder={"first name"}
                  {...field}
                  defaultValue={defaultFirst}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"lastname"}
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex items-center justify-between">
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="text-md w-full rounded-sm py-2"
                  placeholder={"last name"}
                  {...field}
                  defaultValue={defaultLast}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
