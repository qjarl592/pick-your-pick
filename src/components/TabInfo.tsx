import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TabInfoType } from "@/type/tab";

type Props = {
  tabInfo: TabInfoType;
};

export default function TabInfo(props: Props) {
  const { tabInfo } = props;
  const { id, title, artist, thumbnailUrl } = tabInfo;

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/tab/${id}`);
  };

  return (
    <>
      <div
        className="flex space-x-5 rounded-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground"
        onClick={() => handleClick(id)}
      >
        <Image src={thumbnailUrl} width={100} height={70} alt={title} />
        <div className="flex flex-col">
          <Label className="text-lg">{title}</Label>
          <span className="text-sm">{artist}</span>
        </div>
      </div>
      <Separator className="my-2" />
    </>
  );
}
