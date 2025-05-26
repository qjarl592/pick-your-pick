import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  selectedVideo: YoutubeSearchItem;
  onSubmit: (data: TabInputForm & { thumbnailUrl: string }) => void;
}

const tabInputFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
  difficulty: z.number().min(1, "난이도를 선택해주세요").max(5, "난이도를 선택해주세요"),
  pdfFile: z
    .custom<FileList>((val) => val instanceof FileList, "FileList가 필요합니다")
    .refine((files) => files.length > 0, "PDF 파일을 선택해주세요")
    .refine((files) => files[0]?.type === "application/pdf", "PDF 파일만 업로드 가능합니다"),
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

  const difficultyOptions = [
    { value: 1, label: "매우 쉬움" },
    { value: 2, label: "쉬움" },
    { value: 3, label: "보통" },
    { value: 4, label: "어려움" },
    { value: 5, label: "매우 어려움" },
  ];

  const watchedPdfFile = form.watch("pdfFile");
  const selectedFile = watchedPdfFile?.[0];

  useEffect(() => {
    form.reset({
      title: selectedVideo.snippet.title,
      artist: selectedVideo.snippet.channelTitle,
    });
  }, [selectedVideo, form]);

  const handleSubmit = (values: TabInputForm) => {
    const thumbnailUrl = thumbnails.medium.url;
    onSubmit({ ...values, thumbnailUrl });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
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
              <FormLabel>아티스트</FormLabel>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>난이도</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="난이도를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value?.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pdfFile"
          render={({ field: { onChange, value: _, ...field } }) => (
            <FormItem>
              <FormLabel>PDF 파일 *</FormLabel>
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input type="file" accept=".pdf" onChange={(e) => onChange(e.target.files)} {...field} />
                </div>
              </FormControl>
              <FormDescription>PDF 파일만 업로드 가능합니다</FormDescription>

              {/* 선택된 파일 정보 표시 */}
              {selectedFile && (
                <div className="mt-2 rounded-md border bg-blue-50 p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">선택된 파일:</span> {selectedFile.name}
                  </p>
                  <p className="text-sm text-blue-600">
                    크기: {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
