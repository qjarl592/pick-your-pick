import React from "react";

import Wrapper from "@/components/tab/composite/Wrappter";

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
      <Wrapper tabData={tabMockData} />
    </main>
  );
}
