import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteOne } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/store/confirmStore";

interface Props {
  id: string;
  title: string;
  artist: string;
  onDelete: () => void;
}

export default function ScoreDeleteButton({ id, title, artist, onDelete }: Props) {
  const queryClient = useQueryClient();
  const { requestConfirm } = useConfirm();

  const deleteScoreMutation = async (scoreId: string) => {
    await deleteOne("score", scoreId);
  };

  const { mutate } = useMutation({
    mutationFn: deleteScoreMutation,
    onSuccess: () => {
      toast.success("악보가 성공적으로 삭제됐습니다", {
        description: `${title} by ${artist}`,
      });
      queryClient.invalidateQueries({ queryKey: ["scores"] });
      onDelete();
    },
    onError: (error) => {
      console.error(error);
      toast.error("악보 삭제에 실패했습니다.", {
        description: "문제가 반복되면 관리자에게 문의해주세요.",
      });
    },
  });

  const handleClickDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await requestConfirm({
      title: "악보 삭제",
      description: `${title} 악보를 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 관련된 모든 파일이 삭제됩니다.`,
      onConfirm: () => {
        mutate(id);
      },
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="size-7 rounded-full bg-red-500 p-0 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-red-600 group-hover:opacity-100"
      onClick={handleClickDelete}
    >
      <Trash2 size={12} className="text-white" />
    </Button>
  );
}
