import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import '../../styles/ui.css'; // Add this import

function Button({
  className,
  variant, // Kept for logic
  size,    // Kept for logic
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  // Manually construct class names based on variant and size
  const getButtonClasses = () => {
    let classes = 'btn'; // Base class

    // Apply variant classes
    switch (variant) {
      case 'destructive':
        classes += ' btn--destructive';
        break;
      case 'outline':
        classes += ' btn--outline';
        break;
      case 'secondary':
        classes += ' btn--secondary';
        break;
      case 'ghost':
        classes += ' btn--ghost';
        break;
      case 'link':
        classes += ' btn--link';
        break;
      default: // default or undefined
        classes += ' btn--default';
        break;
    }

    // Apply size classes
    switch (size) {
      case 'sm':
        classes += ' btn--sm';
        break;
      case 'lg':
        classes += ' btn--lg';
        break;
      case 'icon':
        classes += ' btn--icon';
        break;
      default: // default or undefined
        classes += ' btn--default-size'; // Separate default size class
        break;
    }
    return classes;
  };

  return (
    <Comp
      data-slot="button"
      className={cn(getButtonClasses(), className)} // Use cn to merge with external className
      {...props}
    />
  );
}

// buttonVariants is no longer exported as it's replaced by getButtonClasses internally
export { Button };
