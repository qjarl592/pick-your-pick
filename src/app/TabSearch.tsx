"use client";

import TabSearchResult from "@/components/TabSearchResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useRef, useState } from "react";

export default function TabSearch() {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!inputRef.current) return;
    setKeyword(inputRef.current.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    if (e.code !== "Enter") return;
    setKeyword(inputRef.current.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-[560px] items-center px-4 py-0.5  rounded-full border border-gray-200 shadow-md">
        <Button
          className="rounded-full p-2 "
          asChild
          variant="ghost"
          size="icon"
          onClick={onClickHandler}
        >
          <Search color="#64748B" />
        </Button>
        <Input
          ref={inputRef}
          placeholder="search tabs you want to"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          onKeyDown={onKeyDownHandler}
        />
      </div>
      <TabSearchResult keyword={keyword} />
    </div>
  );
}
