"use client";

import { Search } from "lucide-react";
import React, { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScoreFilterStore } from "@/store/scoreFilterStore";

export default function SearchBar() {
  const { keyword, setKeyword } = useScoreFilterStore((state) => ({
    keyword: state.keyword,
    setKeyword: state.setKeyword,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchTerm = (form.elements.namedItem("search") as HTMLInputElement).value;
    setKeyword(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div className="relative flex items-center">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-blue-500" />
          <Input
            defaultValue={keyword}
            type="search"
            name="search"
            placeholder="악보 제목, 작곡가, 장르로 검색하세요"
            className="h-12 rounded-full border-2 border-blue-100 bg-white/80 pl-12 pr-24 text-gray-700 shadow-sm backdrop-blur-sm transition-all focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <Button
          type="submit"
          className="absolute right-1 h-10 rounded-full bg-blue-600 px-4 text-white transition-colors hover:bg-blue-700"
        >
          검색
        </Button>
      </div>
    </form>
  );
}
