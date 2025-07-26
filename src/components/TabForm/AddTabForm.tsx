import { z } from "zod";

import { BaseTabForm, BaseTabFormData } from "./BaseTabForm";

const addTabSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
  difficulty: z.number({ message: "난이도를 선택해주세요" }),
  pdfFile: z
    .instanceof(File, { message: "PDF 파일을 업로드해주세요" })
    .refine((file) => file.type === "application/pdf", "PDF 파일만 업로드 가능합니다"),
});

export type AddTabFormData = z.infer<typeof addTabSchema>;

interface AddTabFormProps {
  title: string;
  artist: string;
  thumbnailUrl: string;
  onSubmit: (data: AddTabFormData & { thumbnailUrl: string }) => void;
}

export function AddTabForm({ title, artist, thumbnailUrl, onSubmit }: AddTabFormProps) {
  const handleSubmit = (data: BaseTabFormData) => {
    onSubmit({
      ...data,
      thumbnailUrl,
      pdfFile: data.pdfFile!,
    });
  };

  return (
    <BaseTabForm
      schema={addTabSchema}
      defaultValues={{
        title,
        artist,
        difficulty: 0, // 사용자가 선택
      }}
      onSubmit={handleSubmit}
      submitButtonText="곡 추가"
    />
  );
}
