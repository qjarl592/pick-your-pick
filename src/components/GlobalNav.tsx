import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserIcon, LogOut, Plus, Search, Star } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import LoginModal from "./LoginModal";

export default function GlobalNav() {
  return (
    <>
      <div className="absolute left-3 top-3 h-10 px-4 py-1 text-lg font-bold">
        Pick Your Pick
      </div>
      <NavigationMenu className="absolute right-3 top-3">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Search />
              </NavigationMenuLink>
            </Link>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Plus />
              </NavigationMenuLink>
            </Link>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Star />
              </NavigationMenuLink>
            </Link>
            <LoginModal />

            <NavigationMenuTrigger>
              <CircleUserIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <div className="w-[240px] p-1">
                  <div className="flex flex-col space-y-2 justify-center items-center p-2">
                    <Avatar className="w-[70%] h-[70%]">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      안녕하세요. User
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
                  <div className="block items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <span className="flex text-sm font-medium leading-none">
                      <LogOut size={14} className="mr-3" />
                      로그아웃
                    </span>
                  </div>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
