"use client";

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
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginModal() {
  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <Dialog>
      <DialogTrigger className={navigationMenuTriggerStyle()}>
        <LogIn className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>~~~~~</DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleLogin}>
          Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
