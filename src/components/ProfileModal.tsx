"use client";

import { CircleUserIcon, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LoginModal from "./LoginModal";
import { navigationMenuTriggerStyleWithoutFocus } from "./ui/navigation-menu";

export default function ProfileModal() {
  const { data: session, status } = useSession();

  const handleClickSignOut = () => {
    signOut();
  };

  return (
    <>
      {status === "authenticated" && session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={navigationMenuTriggerStyleWithoutFocus()} aria-label="User profile menu">
              <CircleUserIcon className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="flex flex-col items-center justify-center space-y-2 p-2">
              <Avatar className="size-[70%]">
                <AvatarImage src={session.user.image ?? undefined} alt="User avatar" />
                <AvatarFallback>{session.user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{`안녕하세요. ${session.user.name ?? "사용자"}님`}</span>
            </div>

            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild>
              <a
                href="/mypage"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">마이페이지 이동</div>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem onSelect={handleClickSignOut}>
              <span className="flex text-sm font-medium leading-none">
                <LogOut size={14} className="mr-3" />
                로그아웃
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginModal />
      )}
    </>
  );
}
