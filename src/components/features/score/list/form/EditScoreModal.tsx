import { Score } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { updateWithPdf } from "@/lib/actions";

import { EditScoreForm, EditScoreFormData } from "./EditScoreForm";

interface Props {
  score: Score;
  children: ReactNode;
}

export default function EditScoreModal({ score, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateScoreMutation = async (formData: EditScoreFormData) => {
    // Server Actions에서 File 객체를 처리하려면 FormData를 사용해야 함
    const form = new FormData();
    form.append("title", formData.title);
    form.append("artist", formData.artist);
    form.append("difficulty", formData.difficulty.toString());

    if (formData.pdfFile) {
      form.append("pdfFile", formData.pdfFile);
    }

    const result = await updateWithPdf("score", score.id, form);

    if (result.error) {
      throw new Error(result.error);
    }

    if (!result.data) {
      throw new Error("업데이트된 데이터를 받지 못했습니다");
    }

    return result.data;
  };

  const { mutate } = useMutation({
    mutationFn: updateScoreMutation,
    onSuccess: (updatedScore) => {
      toast.success("악보가 성공적으로 수정됐습니다", {
        description: `${updatedScore.title} by ${updatedScore.artist}`,
      });
      queryClient.setQueryData(["score", score.id], updatedScore);
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
    onSettled: () => {
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("악보 수정에 실패했습니다.", {
        description: "문제가 반복되면 관리자에게 문의해주세요.",
      });
    },
  });

  const handleSubmit = (formData: EditScoreFormData & { thumbnailUrl: string }) => {
    mutate({
      title: formData.title,
      artist: formData.artist,
      difficulty: formData.difficulty,
      pdfFile: formData.pdfFile,
    });
  };

  if (
    !score.userId ||
    !score.id ||
    !score.title ||
    !score.artist ||
    !score.difficulty ||
    !score.thumbnailUrl
  ) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex max-h-[80vh] flex-col gap-3 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="w-full">
          <DialogTitle>악보 수정</DialogTitle>
          <DialogDescription>아래 양식을 작성해 악보 정보를 수정해 주세요.</DialogDescription>
        </DialogHeader>
        <EditScoreForm
          title={score.title}
          artist={score.artist}
          difficulty={score.difficulty}
          thumbnailUrl={score.thumbnailUrl}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
