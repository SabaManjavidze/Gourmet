"use client";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { TimePickerInput } from "./input";
import { TimePickerDemo } from "./demo";
type TimePickerFormProps = {
  control: any;
  title?: string;
  name: string;
};
export function TimePickerForm({
  name,
  title = "",
  control,
}: TimePickerFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2 flex flex-col">
          <FormMessage />
          <FormControl>
            <TimePickerDemo setDate={field.onChange} date={field.value} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
