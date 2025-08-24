"use client";

import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useConfirmProvider } from "@/store/confirmStore";

interface Props {
  children: ReactNode;
}

export default function ConfirmProvider({ children }: Props) {
  const { resolver, isOpen, title, description } = useConfirmProvider();

  const onAction = () => {
    resolver(true);
  };

  const onCancel = () => {
    resolver(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open && resolver) {
      resolver(false);
    }
  };

  return (
    <>
      {children}
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={onAction}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
