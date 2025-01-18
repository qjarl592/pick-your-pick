import Link from "next/link";
import React from "react";

import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

interface Props {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function IconLink(props: Props) {
  const { href, icon, label } = props;
  return (
    <Link href={href} passHref legacyBehavior>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        <span className="sr-only">{label}</span>
        {icon}
      </NavigationMenuLink>
    </Link>
  );
}
