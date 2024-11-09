import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https:/${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const storageName = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;

export async function getTabUrl(id: string) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.storage.from(storageName).getPublicUrl(`tab/${id}.gp3`);
    return data.publicUrl;
  } catch (error) {
    console.error("Error tab", error);
    throw error;
  }
}

export async function getAudioUrl(id: string) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.storage.from(storageName).getPublicUrl(`audio/${id}.mp3`);
    return data.publicUrl;
  } catch (error) {
    console.error("Error audio", error);
    throw error;
  }
}
