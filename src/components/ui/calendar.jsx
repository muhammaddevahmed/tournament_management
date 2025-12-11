"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { Button } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
          <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn("calendar", className)}
          classNames={{
            months: cn("calendar-months", classNames?.months),
            month: cn("calendar-month", classNames?.month),
            caption: cn("calendar-caption", classNames?.caption),
            caption_label: cn("calendar-caption-label", classNames?.caption_label),
            nav: cn("calendar-nav", classNames?.nav),
            nav_button: cn(
              "calendar-nav-button",
              classNames?.nav_button,
            ),
            nav_button_previous: cn("calendar-nav-button-previous", classNames?.nav_button_previous),
            nav_button_next: cn("calendar-nav-button-next", classNames?.nav_button_next),
            table: cn("calendar-table", classNames?.table),
            head_row: cn("calendar-head-row", classNames?.head_row),
            head_cell: cn("calendar-head-cell", classNames?.head_cell),
            row: cn("calendar-row", classNames?.row),
            cell: cn(
              "calendar-cell",
              props.mode === "range"
                ? "calendar-mode-range [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md",
              classNames?.cell,
            ),
            day: cn(
              "calendar-day",
              classNames?.day,
            ),
            day_range_start: cn(
              "calendar-day-range-start",
              classNames?.day_range_start,
            ),
            day_range_end: cn(
              "calendar-day-range-end",
              classNames?.day_range_end,
            ),
            day_selected: cn("calendar-day-selected", classNames?.day_selected),
            day_today: cn("calendar-day-today", classNames?.day_today),
            day_outside: cn("calendar-day-outside", classNames?.day_outside),
            day_disabled: cn("calendar-day-disabled", classNames?.day_disabled),
            day_range_middle: cn(
              "calendar-day-range-middle",
              classNames?.day_range_middle,
            ),
            day_hidden: cn("calendar-day-hidden", classNames?.day_hidden),
            ...classNames,
          }}
          components={{
            IconLeft: ({ className, ...props }) => (
              <Button variant="outline" size="icon" className={cn("calendar-icon-nav calendar-nav-button-previous", className)} {...props}><ChevronLeft className="size-4" /></Button>
            ),
            IconRight: ({ className, ...props }) => (
              <Button variant="outline" size="icon" className={cn("calendar-icon-nav calendar-nav-button-next", className)} {...props}><ChevronRight className="size-4" /></Button>
            ),
            Day: ({ className, ...props }) => (
              <Button variant="ghost" size="icon" className={cn("calendar-day", className)} {...props} />
            ),
            Caption: ({ ...props }) => (
              <div className="calendar-caption">
                <div className="calendar-caption-label">{props.children}</div>
                <div className="calendar-nav">
                  <Button variant="outline" size="icon" className="calendar-nav-button-previous calendar-nav-button">
                    <ChevronLeft className="calendar-icon-nav" />
                  </Button>
                  <Button variant="outline" size="icon" className="calendar-nav-button-next calendar-nav-button">
                    <ChevronRight className="calendar-icon-nav" />
                  </Button>
                </div>
              </div>
            )
          }}
          {...props}
        />  );
}

export { Calendar };
