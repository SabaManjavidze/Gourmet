"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./input";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2 gap-x-1">
      <div className="text-center">
        {/* <Label htmlFor="hours" className="text-xs">
          Hours
        </Label> */}
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>

      <div className="flex h-10 items-center text-lg font-semibold">
        <p>:</p>
      </div>
      <div className="text-center">
        {/* <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label> */}
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
    </div>
  );
}
