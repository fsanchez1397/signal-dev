import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardProfile() {
  // 1. Get the current user from Supabase
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. If the user exists, fetch their profile from the database using Prisma
  let profile = null;
  if (user) {
    profile = await prisma.candidateProfile.findUnique({
      where: {
        userId: user.id, // Use the user's ID to find the correct profile
      },
    });
  }

  // 3. Render the profile data, with a fallback if not found
  if (!profile) {
    return <div>Could not find user profile.</div>;
  }

  return (
    <div>
      <p>This Works</p>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
}
