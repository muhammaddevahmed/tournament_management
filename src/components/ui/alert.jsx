import * as React from "react";
// import { cva } from "class-variance-authority"; // Removed

function getAlertClasses({ variant }) {
  let classes = "alert";

  switch (variant) {
    case "destructive":
      classes += " alert--destructive";
      break;
    default: // default or undefined
      classes += " alert--default";
      break;
  }
  return classes;
}

function Alert({
  className,
  variant,
  ...props
}) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(getAlertClasses({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "alert-title",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "alert-description",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
