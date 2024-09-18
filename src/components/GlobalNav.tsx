import { PlusIcon, SearchIcon, StarIcon } from "lucide-react";
import React from "react";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

import IconLink from "./IconLink";
import ProfileModal from "./ProfileModal";

export default function GlobalNav() {
  return (
    <>
      <div className="absolute left-3 top-3 h-10 px-4 py-1 text-lg font-bold">Pick Your Pick</div>
      <NavigationMenu className="absolute right-3 top-3">
        <NavigationMenuList>
          <NavigationMenuItem>
            <IconLink href="/search" icon={<SearchIcon className="w-5 h-5" />} label="search" />
            <IconLink href="/add" icon={<PlusIcon className="w-5 h-5" />} label="add" />
            <IconLink href="/favorites" icon={<StarIcon className="w-5 h-5" />} label="favorites" />
            <ProfileModal />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
