import { useEffect, useState } from "react";

import { getTabUrl, getAudioUrl } from "@/app/api/tab/route";
import { TabData } from "@/components/tab/composite/Wrappter";

export default function useTab(id: string) {
  const [tabData, setTabData] = useState<TabData>({
    tabFileUrl: "",
    tabAudioUrl: "",
  });

  useEffect(() => {
    async function loadUrls() {
      const [audio, tab] = await Promise.all([getAudioUrl(id), getTabUrl(id)]);

      setTabData({
        tabFileUrl: tab,
        tabAudioUrl: audio,
      });
    }

    loadUrls();
  }, [id]);

  return tabData;
}
