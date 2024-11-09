"use client";

import React from "react";

import Wrapper from "@/components/tab/composite/Wrappter";
import useSupabase from "@/hooks/useSupabase/useSupabase";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;
  const { slug } = params;
  const tabData = useSupabase(slug);
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Wrapper tabData={tabData} />
    </main>
  );
}
