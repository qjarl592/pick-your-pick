import { useEffect, useState } from "react";

import { TabData } from "@/components/tab/composite/Wrappter";
import { getStorageUrl } from "@/lib/supabase";

export default function useSupabase(id: string) {
  const [tabData, setTabData] = useState<TabData>({
    tabFileUrl: "",
    tabAudioUrl: "",
  });

  useEffect(() => {
    async function loadUrls() {
      const [tabFileUrl, tabAudioUrl] = await Promise.all([
        getStorageUrl(`tab/${id}.gp3`),
        getStorageUrl(`audio/${id}.mp3`),
      ]);

      setTabData({
        tabFileUrl: tabFileUrl.trim().replaceAll("%0A", ""),
        tabAudioUrl: tabAudioUrl.trim().replaceAll("%0A", ""),
      });
    }

    loadUrls();
  }, [id]);

  return tabData;
}
