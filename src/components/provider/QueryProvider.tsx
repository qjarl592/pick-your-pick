"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        console.log(error);
        toast.error("악보 추가에 실패했습니다.", {
          description: "문제가 반복되면 관리자에게 문의해주세요.",
        });
      },
    },
  },
});

export default function QueryProvider(props: Props) {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
