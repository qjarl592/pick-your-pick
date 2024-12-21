import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import GuitarProUploader from "../AddTabModal/GuitarProUploader";

interface Props {
  onSubmit: (data: TabInputForm & { tabFilePath: string }) => void;
}

const tabInputFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
  thumbnailUrl: z.string().url("올바른 URL을 입력해주세요"),
});

export type TabInputForm = z.infer<typeof tabInputFormSchema>;

export function TabForm(props: Props) {
  const { onSubmit } = props;
  const [tabFilePath, setTabFilePath] = useState("");

  const form = useForm<TabInputForm>({
    resolver: zodResolver(tabInputFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      thumbnailUrl: "",
    },
  });

  // 4. 제출 핸들러 추가
  const handleSubmit = (values: TabInputForm) => {
    onSubmit({ ...values, tabFilePath });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>썸네일 URL</FormLabel>
              <FormControl>
                <Input placeholder="이미지 URL을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GuitarProUploader onFileUpload={setTabFilePath} />
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
