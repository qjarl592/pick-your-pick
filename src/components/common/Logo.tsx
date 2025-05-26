import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

const logoVariants = cva("font-bold", {
  variants: {
    size: {
      default: "text-xl",
      sm: "text-base",
      lg: "text-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props extends VariantProps<typeof logoVariants> {
  className?: string;
  link?: boolean;
}
export default function Logo({ className, size, link = true }: Props) {
  if (link) {
    return (
      <Link href="/score" className={cn(logoVariants({ size }), className)}>
        Pick Your Pick
      </Link>
    );
  }

  return <div className={cn(logoVariants({ size }), className)}>Logo</div>;
}
