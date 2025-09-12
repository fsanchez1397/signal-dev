-- CreateEnum
CREATE TYPE "public"."ChallengeCategory" AS ENUM ('ARRAYS_HASHING', 'GRAPHS', 'DEPTH_FIRST_SEARCH', 'DYNAMIC_PROGRAMMING');

-- CreateEnum
CREATE TYPE "public"."InterviewStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'REVIEWED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."CandidateProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "githubUrl" TEXT,
    "bio" TEXT,
    "visaNeeded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "candidateId" TEXT NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_userId_key" ON "public"."CandidateProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "public"."CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
