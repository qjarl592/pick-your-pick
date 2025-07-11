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
  const { resolver, isOpen, title, description, actionText, cancelText } = useConfirmProvider();

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
            <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
