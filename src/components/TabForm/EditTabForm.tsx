import { z } from "zod";

import { BaseTabForm, BaseTabFormData } from "./BaseTabForm";

const editTabSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
  difficulty: z.number({ message: "난이도를 선택해주세요" }),
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", "PDF 파일만 업로드 가능합니다")
    .optional(), // 수정 시에는 선택사항
});

export type EditTabFormData = z.infer<typeof editTabSchema>;

interface Props {
  title: string;
  artist: string;
  difficulty: number;
  thumbnailUrl: string;
  onSubmit: (data: EditTabFormData & { thumbnailUrl: string }) => void;
}

export function EditTabForm({ title, artist, difficulty, thumbnailUrl, onSubmit }: Props) {
  const handleSubmit = (data: BaseTabFormData) => {
    onSubmit({
      ...data,
      thumbnailUrl,
    });
  };

  return (
    <BaseTabForm
      schema={editTabSchema}
      defaultValues={{
        title,
        artist,
        difficulty,
      }}
      onSubmit={handleSubmit}
      submitButtonText="수정 완료"
      isPdfOptional={true}
    />
  );
}
