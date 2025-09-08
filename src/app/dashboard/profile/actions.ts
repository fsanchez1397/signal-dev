"use server";
import { createClient } from "@/utils/supabase/server";

export const onSave = async (formData: FormData) => {
  const supabase = await createClient();
  const data = { fullName: formData.get("fullName") as string };
};
