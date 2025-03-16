import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YoutubeSearchItem } from "@/type/youtube";

interface Props {
  selectedVideo: YoutubeSearchItem;
  onSubmit: (data: TabInputForm & { thumbnailUrl: string }) => void;
}

const tabInputFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
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
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
