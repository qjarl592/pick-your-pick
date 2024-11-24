import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

import YoutubeSearchWrapper from "./YoutubeSearchWrapper";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

export default function AddTabModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAdd = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={navigationMenuTriggerStyle()} variant="link">
          <PlusIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>타브 악보 추가</DialogTitle>
          <DialogDescription>아래 양식을 작성해 새로운 타브 악보를 추가해 주세요.</DialogDescription>
        </DialogHeader>
        <div>
          <YoutubeSearchWrapper />
        </div>
        <DialogFooter>
          <Button onClick={handleClickAdd}>추가</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
