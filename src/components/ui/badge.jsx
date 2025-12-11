import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils"; // Re-inserting cn import

// import { cva } from "class-variance-authority"; // Removed
// import { badgeVariants } from "./badge"; // Removed

function getBadgeClasses({ variant }) {
  let classes = "badge";

  switch (variant) {
    case "secondary":
      classes += " badge--secondary";
      break;
    case "destructive":
      classes += " badge--destructive";
      break;
    case "outline":
      classes += " badge--outline";
      break;
    default: // default or undefined
      classes += " badge--default";
      break;
  }
  return classes;
}

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(getBadgeClasses({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
