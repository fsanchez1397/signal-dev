--
-- This migration applies the initial, critical security policies and privileges for the application.
--

-- 1. Grant usage on the public schema to our application's roles.
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT USAGE ON SCHEMA public TO prisma;

-- 2. Grant all permissions on all current tables to our application's roles.
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO prisma;

-- 3. IMPORTANT: Grant permissions for any tables we create in the FUTURE.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO prisma;

-- 4. Enable Row Level Security on the CandidateProfile table.
ALTER TABLE "public"."CandidateProfile" ENABLE ROW LEVEL SECURITY;

-- 5. Create the policy that allows users to manage THEIR OWN profile.
CREATE POLICY "Users can manage their own profile."
ON "public"."CandidateProfile"
FOR ALL
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- 6. Create the policy that allows users to VIEW THEIR OWN profile.
CREATE POLICY "Users can view their own profile."
ON "public"."CandidateProfile"
FOR SELECT
USING (auth.uid() = "userId");