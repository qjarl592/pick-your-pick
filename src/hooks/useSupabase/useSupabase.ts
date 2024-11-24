import { useEffect, useState } from "react";

import { TabData } from "@/components/tab/composite/Wrappter";
import { getStorageUrl } from "@/lib/supabase";

export default function useSupabase(id: string) {
  const [tabData, setTabData] = useState<TabData>({
    tabFileUrl: "",
    tabAudioUrl: "",
  });

  useEffect(() => {
    const tabFileUrl = getStorageUrl(`tab/${id}.gp3`);
    const tabAudioUrl = getStorageUrl(`audio/${id}.mp3`);

    console.log(tabAudioUrl, tabFileUrl);

    setTabData({
      tabFileUrl,
      tabAudioUrl,
    });
  }, [id]);

  return tabData;
}
