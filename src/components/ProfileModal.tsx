"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { CircleUserIcon, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import LoginModal from "./LoginModal";

export default function ProfileModal() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" && session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={navigationMenuTriggerStyle()}>
              <CircleUserIcon className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="flex flex-col space-y-2 justify-center items-center p-2">
              <Avatar className="w-[70%] h-[70%]">
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt="User avatar"
                />
                <AvatarFallback>{session.user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {`안녕하세요. ${session.user.name ?? "사용자"}님`}
              </span>
            </div>

            <DropdownMenuSeparator className="my-1" />
            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <div className="text-sm font-medium leading-none">
                마이페이지 이동
              </div>
            </a>
            <DropdownMenuSeparator className="my-1" />
            <div
              className="block items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              onClick={() => signOut()}
            >
              <span className="flex text-sm font-medium leading-none">
                <LogOut size={14} className="mr-3" />
                로그아웃
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginModal />
      )}
    </>
  );
}
