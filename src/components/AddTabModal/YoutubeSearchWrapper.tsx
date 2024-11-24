import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { getYoutubeSearch } from "@/api/youtube";
import useDebounce from "@/hooks/useDebounce/useDebounce";

import YoutubeSearchResult from "./YoutubeSearchResult";
import { Input } from "../ui/input";

export default function YoutubeSearchWrapper() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);

  const youtubeSearchQuery = useQuery({
    queryKey: ["youtubeSearch", debouncedKeyword],
    queryFn: getYoutubeSearch,
    enabled: debouncedKeyword.length > 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setKeyword(value);
  };

  return (
    <>
      <Input placeholder="곡 제목을 입력해주세요" onChange={handleChange} value={keyword} />
      <YoutubeSearchResult queryResult={youtubeSearchQuery} />
    </>
  );
}
