import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID?.trim()}.supabase.co`;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const storageName = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getStorageUrl = (path: string) => {
  const { data } = supabase.storage.from(storageName).getPublicUrl(path);
  return data.publicUrl;
};

export const uploadFile = async (path: string, file: File) => {
  const { error } = await supabase.storage.from(storageName).upload(path, file);
  return error;
};
