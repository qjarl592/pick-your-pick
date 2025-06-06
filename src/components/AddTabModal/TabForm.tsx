import { zodResolver } from "@hookform/resolvers/zod";
import { Star, X } from "lucide-react";
import { MouseEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YoutubeSearchItem } from "@/type/youtube";

interface Props {
  selectedVideo: YoutubeSearchItem;
  onSubmit: (data: TabInputForm & { thumbnailUrl: string }) => Promise<void>;
}

const tabInputFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
  difficulty: z.number({ message: "난이도를 선택해주세요" }),
  pdfFile: z
    .instanceof(File, { message: "PDF 파일을 업로드해주세요" })
    .refine((file) => file.type === "application/pdf", "PDF 파일만 업로드 가능합니다"),
});

export type TabInputForm = z.infer<typeof tabInputFormSchema>;

export function TabForm({ selectedVideo, onSubmit }: Props) {
  const { title, channelTitle, thumbnails } = selectedVideo.snippet;
  const form = useForm<TabInputForm>({
    resolver: zodResolver(tabInputFormSchema),
    defaultValues: {
      title: title,
      artist: channelTitle,
    },
  });
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const selectedPdfFile = form.watch("pdfFile");

  useEffect(() => {
    form.reset({
      title: selectedVideo.snippet.title,
      artist: selectedVideo.snippet.channelTitle,
    });
  }, [selectedVideo, form]);

  const handleSubmit = async (values: TabInputForm) => {
    const thumbnailUrl = thumbnails.medium.url;
    await onSubmit({ ...values, thumbnailUrl });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목*</FormLabel>
              <FormControl>
                <Input placeholder="곡 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아티스트*</FormLabel>
              <FormControl>
                <Input placeholder="아티스트 이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => {
            const curValue = field.value ?? 0;

            const clickStar = (idx: number) => {
              if (curValue === idx) {
                form.resetField("difficulty");
                return;
              }
              field.onChange(idx);
            };

            return (
              <FormItem>
                <FormLabel>난이도*</FormLabel>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 })
                    .map((_, idx) => idx)
                    .map((id) => (
                      <button
                        key={`difficulty-input-star${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          clickStar(id + 1);
                        }}
                      >
                        <Star
                          size={30}
                          className={id < curValue ? "text-yellow-400" : "text-gray-300"}
                          fill={id < curValue ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                </div>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="pdfFile"
          render={({ field: { onChange, value: _value, ref: _ref, ...field } }) => {
            const resetFile = (e: MouseEvent) => {
              if (!pdfInputRef.current) return;
              e.preventDefault();
              form.resetField("pdfFile");
              pdfInputRef.current.value = "";
            };

            return (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>PDF 파일*</FormLabel>
                  <FormDescription>PDF 파일만 업로드 가능합니다</FormDescription>
                </div>

                <FormControl>
                  <Input
                    ref={pdfInputRef}
                    type="file"
                    className="w-full"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                  />
                </FormControl>

                {/* 선택된 파일 정보 표시 */}
                {selectedPdfFile && (
                  <div className="relative mt-2 rounded-md border bg-blue-50 p-3">
                    <Button className="absolute right-3 top-2 size-6 p-1" variant="ghost" onClick={resetFile}>
                      <X />
                    </Button>
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">선택된 파일:</span>
                      {selectedPdfFile.name}
                    </p>
                    <p className="text-sm text-blue-600">
                      크기: {(selectedPdfFile.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
