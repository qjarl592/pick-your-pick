import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https:/${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const storageName = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getStorageUrl = async (path: string) => {
  const { data } = await supabase.storage.from(storageName).getPublicUrl(path.trim());
  console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  console.log(data);
  return data.publicUrl;
};
