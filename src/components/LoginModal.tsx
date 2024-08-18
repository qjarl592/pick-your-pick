import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger className={navigationMenuTriggerStyle()}>
        <LogIn />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>~~~~~</DialogDescription>
        </DialogHeader>
        <div>여기에 로그인 폼</div>
      </DialogContent>
    </Dialog>
  );
}
