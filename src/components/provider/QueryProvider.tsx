"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function QueryProvider(props: Props) {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
