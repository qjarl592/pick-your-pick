import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";

type Props = {};

export default function TabInfoCard({}: Props) {
  return (
    <Card className="rounded-3xl p-2">
      <div className="flex px-4 py-2 space-x-4">
        <Image
          src="/sampleThumbnail.webp"
          alt="album cover"
          width={70}
          height={70}
        />
        <div className="flex flex-col">
          <CardHeader className="p-0 text-lg">
            Wake Me Up When September End
          </CardHeader>
          <CardContent className="p-0 text-sm">greenday</CardContent>
        </div>
      </div>
      <div className="flex px-4 py-2 space-x-4">
        <Image
          src="/sampleThumbnail.webp"
          alt="album cover"
          width={70}
          height={70}
        />
        <div className="flex flex-col">
          <CardHeader className="p-0 text-lg">
            Wake Me Up When September End
          </CardHeader>
          <CardContent className="p-0 text-sm">greenday</CardContent>
        </div>
      </div>
      <div className="flex px-4 py-2 space-x-4">
        <Image
          src="/sampleThumbnail.webp"
          alt="album cover"
          width={70}
          height={70}
        />
        <div className="flex flex-col">
          <CardHeader className="p-0 text-lg">
            Wake Me Up When September End
          </CardHeader>
          <CardContent className="p-0 text-sm">greenday</CardContent>
        </div>
      </div>
    </Card>
  );
}
