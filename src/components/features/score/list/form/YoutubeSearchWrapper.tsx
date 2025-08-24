import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce/useDebounce";
import { YoutubeSearchItem } from "@/type/youtube";

import YoutubeSearchResult from "./YoutubeSearchResult";

interface Props {
  onSelectVideo: (video: YoutubeSearchItem) => void;
}

export default function YoutubeSearchWrapper({ onSelectVideo }: Props) {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setKeyword(value);
  };

  return (
    <>
      <Input placeholder="곡 제목을 입력해주세요" onChange={handleChange} value={keyword} />
      <YoutubeSearchResult keyword={debouncedKeyword} onSelectVideo={onSelectVideo} />
    </>
  );
}
