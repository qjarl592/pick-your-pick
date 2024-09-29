"use client";

import React, { HTMLAttributes, RefObject } from "react";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  containerRef: RefObject<HTMLDivElement>;
}
export default function Tab(props: Props) {
  const { containerRef, className, ...rest } = props;

  return (
    <div className={cn("w-full", className)} {...rest}>
      <div ref={containerRef} />
    </div>
  );
}
