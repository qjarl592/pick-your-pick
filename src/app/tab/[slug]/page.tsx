import Tab from "@/components/Tab";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;
  return <Tab file="/tab/green_day_basket_case.gp" />;
}
