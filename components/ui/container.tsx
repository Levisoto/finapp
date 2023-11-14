import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "utils/style";

const containerVariants = cva("flex flex-col lg:max-w-[1536px] w-full px-10", {
  variants: {
    variant: {
      default: "",
      secondary: "",
      destructive: "",
      outline: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, variant, ...props }: ContainerProps) {
  return (
    <div className="h-full flex flex-col items-center">
      <div
        className={cn(containerVariants({ variant }), className)}
        {...props}
      />
    </div>
  );
}

export { Container };
