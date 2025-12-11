"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className="separator"
      {...props}
    />
  );
}

export { Separator };
