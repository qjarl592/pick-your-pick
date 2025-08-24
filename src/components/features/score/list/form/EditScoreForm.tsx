import { z } from "zod";

import { BaseScoreForm, BaseScoreFormData } from "./BaseScoreForm";

const editScoreSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  artist: z.string().min(1, "아티스트 이름을 입력해주세요"),
  difficulty: z.number({ message: "난이도를 선택해주세요" }),
  pdfFile: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", "PDF 파일만 업로드 가능합니다")
    .optional(), // 수정 시에는 선택사항
});

export type EditScoreFormData = z.infer<typeof editScoreSchema>;

interface Props {
  title: string;
  artist: string;
  difficulty: number;
  thumbnailUrl: string;
  onSubmit: (data: EditScoreFormData & { thumbnailUrl: string }) => void;
}

export function EditScoreForm({ title, artist, difficulty, thumbnailUrl, onSubmit }: Props) {
  const handleSubmit = (data: BaseScoreFormData) => {
    onSubmit({
      ...data,
      thumbnailUrl,
    });
  };

  return (
    <BaseScoreForm
      schema={editScoreSchema}
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
