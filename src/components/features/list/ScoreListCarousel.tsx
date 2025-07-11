"use client";

import { MoveRight, MoveLeft } from "lucide-react";
import { Children, Fragment, ReactNode, useEffect, useRef, useState, useMemo, useCallback } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { chunk } from "@/lib/utils";

interface Props {
  row?: number;
  children: ReactNode;
}

export default function ScoreListCarousel({ row = 2, children }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [colNum, setColNum] = useState(1);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // slides를 useMemo로 메모이제이션
  const slides = useMemo(() => {
    return chunk(Children.toArray(children), row * colNum);
  }, [children, row, colNum]);

  const carouselRef = useRef<HTMLDivElement>(null);

  // setResponsiveColNum을 useCallback으로 메모이제이션
  const setResponsiveColNum = useCallback((curSlideWidth: number) => {
    const itemWidth = 180;
    const gap = 24;
    const newColNum = Math.max(1, Math.floor((curSlideWidth + gap) / (itemWidth + gap)));
    setColNum(newColNum);
  }, []);

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
  }, [setResponsiveColNum]);

  useEffect(() => {
    if (!api) return;

    const updateCarouselState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCarouselState();

    api.on("select", updateCarouselState);

    // cleanup
    return () => {
      api.off("select", updateCarouselState);
    };
  }, [api]);

  // 슬라이드가 변경될 때 carousel 상태 업데이트
  useEffect(() => {
    if (!api) return;

    // 슬라이드 수가 변경되면 carousel을 다시 초기화
    const timer = setTimeout(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    }, 0);

    return () => clearTimeout(timer);
  }, [slides.length, api]);

  return (
    <div className="px-4">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        ref={carouselRef}
        className="relative w-full"
        setApi={setApi}
      >
        <CarouselContent className="py-4">
          {slides.map((slide, slideIndex) => (
            <CarouselItem key={`slide-${slideIndex}`} className="flex w-full justify-center">
              <div
                className="mx-auto grid justify-center gap-6"
                style={{
                  gridTemplateColumns: `repeat(${colNum}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
                }}
              >
                {slide.map((item, itemIndex) => (
                  <Fragment key={`item-${slideIndex}-${itemIndex}`}>{item}</Fragment>
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

      <div className="mt-4 flex justify-center">
        <div className="rounded-full bg-black/10 px-3 py-1 text-sm text-gray-600">
          {current} / {count}
        </div>
      </div>
    </div>
  );
}
