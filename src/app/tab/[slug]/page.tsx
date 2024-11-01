import React from "react";

import GlobalNav from "@/components/GlobalNav";
import Tab from "@/components/Tab";

// type Props = {
//   params: {
//     slug: string;
//   };
// };

const tabMockData = {
  tabFileUrl: "/tab/green_day_basket_case.gp",
  tabAudioUrl: "/musics/Basket_Case.mp3",
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <GlobalNav />
      <Tab file={tabMockData.tabFileUrl} fileUrl={tabMockData.tabFileUrl} className="mt-32 px-10" />
    </main>
  );
}
