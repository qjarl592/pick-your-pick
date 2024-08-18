"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CircleUserIcon, LogOut, Plus, Search, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import LoginModal from "./LoginModal";
import IconLink from "./IconLink";

export default function GlobalNav() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <div className="absolute left-3 top-3 h-10 px-4 py-1 text-lg font-bold">
        Pick Your Pick
      </div>
      <NavigationMenu className="absolute right-3 top-3">
        <NavigationMenuList>
          <NavigationMenuItem>
            <IconLink
              href="/search"
              icon={<Search className="w-5 h-5" />}
              label="search"
            />
            <IconLink
              href="/add"
              icon={<Plus className="w-5 h-5" />}
              label="add"
            />
            <IconLink
              href="/favorites"
              icon={<Star className="w-5 h-5" />}
              label="favorites"
            />
            {status === "authenticated" && session?.user ? (
              <>
                <NavigationMenuTrigger>
                  <CircleUserIcon />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[240px] p-1">
                    <div className="flex flex-col space-y-2 justify-center items-center p-2">
                      <Avatar className="w-[70%] h-[70%]">
                        <AvatarImage
                          src={session.user.image ?? undefined}
                          alt="User avatar"
                        />
                        <AvatarFallback>
                          {session.user.name?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {`안녕하세요. ${session.user.name ?? "사용자"}님`}
                      </span>
                    </div>
                    <Separator className="my-1" />
                    <NavigationMenuLink asChild>
                      <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">
                          마이페이지 이동
                        </div>
                      </a>
                    </NavigationMenuLink>
                    <Separator className="my-1" />
                    <div
                      className="block items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={handleLogout}
                    >
                      <span className="flex text-sm font-medium leading-none">
                        <LogOut size={14} className="mr-3" />
                        로그아웃
                      </span>
                    </div>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <LoginModal />
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
