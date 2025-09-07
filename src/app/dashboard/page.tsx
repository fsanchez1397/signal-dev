import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { signOut } from "../login/actions";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <button
        onClick={signOut}
        className="border-red-500 border-2 bg-amber-200"
      >
        Sign Out
      </button>
    </>
  );
}
