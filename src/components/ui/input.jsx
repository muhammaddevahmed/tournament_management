import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "input-base", // Refactored to use a single base class
        className,
      )}
      {...props}
    />
  );
}

export { Input };
