"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LoginButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function LoginButton({
  children = "시작하기",
  className = "",
  variant = "default",
  size = "default",
}: LoginButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/score" });
  };

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setIsOpen(true)}>
        {children}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>계정에 로그인하여 악보 관리를 시작하세요.</DialogDescription>
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
    </>
  );
}
