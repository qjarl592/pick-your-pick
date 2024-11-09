import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { TabData } from "@/components/tab/composite/Wrappter";

export default function useSupabase(id: string) {
  const supabaseUrl = `https:/${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const storageName = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const [tabData, setTabData] = useState<TabData>({
    tabFileUrl: "",
    tabAudioUrl: "",
  });

  useEffect(() => {
    async function loadUrls() {
      const { data: tab } = await supabase.storage.from(storageName).getPublicUrl(`tab/${id}.gp3`);
      const { data: audio } = await supabase.storage.from(storageName).getPublicUrl(`audio/${id}.mp3`);

      setTabData({
        tabFileUrl: tab.publicUrl,
        tabAudioUrl: audio.publicUrl,
      });
    }

    loadUrls();
  }, [id, storageName, supabase.storage]);

  return tabData;
}
