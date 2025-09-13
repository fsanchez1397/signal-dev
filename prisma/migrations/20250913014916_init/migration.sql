-- CreateEnum
CREATE TYPE "public"."ChallengeCategory" AS ENUM ('ARRAYS_HASHING', 'GRAPHS', 'DEPTH_FIRST_SEARCH', 'DYNAMIC_PROGRAMMING');

-- CreateEnum
CREATE TYPE "public"."InterviewStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'REVIEWED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."CandidateProfile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "githubUrl" TEXT,
    "bio" TEXT,
    "visaNeeded" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" TEXT NOT NULL,
    "score" INTEGER,
    "recordingUrl" TEXT,
    "status" "public"."InterviewStatus" NOT NULL DEFAULT 'COMPLETED',
    "category" "public"."ChallengeCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidateId" UUID NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_userId_key" ON "public"."CandidateProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_email_key" ON "public"."CandidateProfile"("email");

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
