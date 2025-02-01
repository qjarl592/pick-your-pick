"use client";

import { nanoid } from "nanoid";
import { Children, Fragment, ReactNode } from "react";

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
  col?: number;
  children: ReactNode;
}

export default function ScoreListCarousel({ row = 2, col = 5, children }: Props) {
  const slides = chunk(Children.toArray(children), row * col);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      style={{ width: `${col * 160 + (col - 1) * 16}px` }}
    >
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={nanoid()} className="w-fit">
            <div
              key={nanoid()}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
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
