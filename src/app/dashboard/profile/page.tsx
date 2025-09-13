import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/utils/prisma/prisma";
import { redirect } from "next/navigation";

export default async function DashboardProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  let profile = null;
  if (user) {
    profile = await prisma.candidateProfile.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

  if (!profile) {
    return <div>Could not find user profile.</div>;
  }

  return (
    <div>
      <EditProfileForm user={user} profile={profile} />
    </div>
  );
}
