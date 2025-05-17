"use client";

import { MoveRight, MoveLeft } from "lucide-react";
import { nanoid } from "nanoid";
import { Children, Fragment, ReactNode, useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { chunk } from "@/lib/utils";

interface Props {
  row?: number;
  children: ReactNode;
}

export default function ScoreListCarousel({ row = 2, children }: Props) {
  const [colNum, setColNum] = useState(1);
  const slides = chunk(Children.toArray(children), row * colNum);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (!carouselRef.current) return;
      const { clientWidth } = carouselRef.current;
      setResponsiveColNum(clientWidth);
    };

    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const setResponsiveColNum = (curSlideWidth: number) => {
    const itemWidth = 180; // 카드 너비 업데이트 (원래 160)
    const gap = 24; // 갭 업데이트 (원래 16)
    const newColNum = Math.max(1, Math.floor((curSlideWidth + gap) / (itemWidth + gap)));
    setColNum(newColNum);
  };

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      ref={carouselRef}
      className="relative w-full"
    >
      <CarouselContent className="py-4">
        {slides.map((slide) => (
          <CarouselItem key={nanoid()} className="flex w-full justify-center">
            <div
              key={nanoid()}
              className="mx-auto grid justify-center gap-6"
              style={{
                gridTemplateColumns: `repeat(${colNum}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
              }}
            >
              {slide.map((item) => (
                <Fragment key={nanoid()}>{item}</Fragment>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* 커스텀 네비게이션 버튼 */}
      <CarouselPrevious className="-left-4 size-10 border-blue-200 bg-white/80 text-blue-600 shadow-md hover:bg-blue-100 hover:text-blue-700">
        <MoveLeft className="size-5" />
      </CarouselPrevious>

      <CarouselNext className="-right-4 size-10 border-blue-200 bg-white/80 text-blue-600 shadow-md hover:bg-blue-100 hover:text-blue-700">
        <MoveRight className="size-5" />
      </CarouselNext>
    </Carousel>
  );
}
