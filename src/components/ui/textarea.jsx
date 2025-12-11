import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "textarea-base", // Refactored to use a single base class
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
