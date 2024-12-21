import { useEffect, useState } from "react";

import { TabData } from "@/components/tab/composite/Wrapper";
import { getStorageUrl } from "@/lib/supabase";

export default function useSupabase(id: string) {
  const [tabData, setTabData] = useState<TabData>({
    tabFileUrl: "",
    tabAudioUrl: "",
  });

  useEffect(() => {
    const tabFileUrl = getStorageUrl(`tab/${id}.gp3`);
    const tabAudioUrl = getStorageUrl(`audio/${id}.mp3`);

    setTabData({
      tabFileUrl,
      tabAudioUrl,
    });
  }, [id]);

  return tabData;
}
