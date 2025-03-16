"use client";

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
    const itemWidth = 160;
    const gap = 16;
    const newColNum = Math.max(1, Math.floor((curSlideWidth + gap) / (itemWidth + gap)));
    setColNum(newColNum);
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      ref={carouselRef}
      className="w-full"
    >
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={nanoid()} className="flex w-full justify-center">
            <div
              key={nanoid()}
              className="mx-auto grid justify-center gap-4"
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
    </Carousel>
  );
}
