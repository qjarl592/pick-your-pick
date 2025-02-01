"use client";

import { Search } from "lucide-react";
import React, { FormEvent } from "react";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchTerm = (form.elements.namedItem("search") as HTMLInputElement).value;
    console.log("Searching for:", searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full max-w-sm">
      <div className="relative">
        <Input type="search" name="search" placeholder="검색어를 입력하세요." className="pl-8" />
        <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
      </div>
    </form>
  );
}
