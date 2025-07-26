import { Score } from "@prisma/client";
import { Settings } from "lucide-react";

import EditModal from "../EditModal/EditModal";
import { Button } from "../ui/button";

interface Props {
  score: Score;
  onDelete: () => void;
}

export default function ScoreEditButton({ score }: Props) {
  const handleClickDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <EditModal score={score}>
      <Button
        variant="ghost"
        size="sm"
        className="size-7 rounded-full bg-gray-500 p-0 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-gray-600 group-hover:opacity-100"
        onClick={handleClickDelete}
      >
        <Settings size={12} className="text-white" />
      </Button>
    </EditModal>
  );
}
