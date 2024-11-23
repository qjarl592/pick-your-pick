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

      setTabData({ tabFileUrl, tabAudioUrl });
    }

    loadUrls();
  }, [id]);

  return tabData;
}
