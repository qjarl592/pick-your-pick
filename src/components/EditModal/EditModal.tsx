import { Score } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

import { update } from "@/app/actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { EditTabForm, EditTabFormData } from "../TabForm";

interface Props {
  score: Score;
  children: ReactNode;
}

export default function EditModal({ score, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateScoreMutation = async (formData: EditTabFormData) => {
    const newScore = {
      ...score,
      title: formData.title,
      artist: formData.artist,
      difficulty: formData.difficulty,
    };
    await update("score", score.id, newScore);
    return newScore;
  };

  const { mutate } = useMutation({
    mutationFn: updateScoreMutation,
    onSuccess: ({ title, artist }) => {
      toast.success("악보가 성공적으로 수정됐습니다", {
        description: `${title} by ${artist}`,
      });
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

  const handleSubmit = (formData: EditTabFormData & { thumbnailUrl: string }) => {
    mutate({
      title: formData.title,
      artist: formData.artist,
      difficulty: formData.difficulty,
      pdfFile: formData.pdfFile,
    });
  };

  if (!score.title || !score.artist || !score.difficulty || !score.thumbnailUrl) {
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
        <EditTabForm
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
