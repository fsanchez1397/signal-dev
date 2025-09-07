import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { signOut } from "../login/actions";
import { Button } from "@/components/ui/button";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>

      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
