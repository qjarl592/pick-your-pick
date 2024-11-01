"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

export default function LoginModal() {
  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <Dialog>
      <DialogTrigger className={navigationMenuTriggerStyle()}>
        <LogIn className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>계정에 로그인하세요.</DialogDescription>
        </DialogHeader>
        <Button
          onClick={handleLogin}
          className="mt-6 flex w-full items-center justify-center gap-2 border border-gray-300 bg-white text-black hover:bg-gray-100"
        >
          <Image src="/logos/google_login_logo.svg" alt="Google logo" width={18} height={18} />
          Google로 로그인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
