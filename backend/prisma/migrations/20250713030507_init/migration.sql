-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "university_email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficialLecture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "OfficialLecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplementaryLecture" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "officialLectureId" INTEGER NOT NULL,

    CONSTRAINT "SupplementaryLecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplementaryLectureAttendance" (
    "userId" TEXT NOT NULL,
    "supplementaryLectureId" INTEGER NOT NULL,

    CONSTRAINT "SupplementaryLectureAttendance_pkey" PRIMARY KEY ("userId","supplementaryLectureId")
);

-- CreateTable
CREATE TABLE "SupplementaryLectureRequest" (
    "userId" TEXT NOT NULL,
    "officialLectureId" INTEGER NOT NULL,

    CONSTRAINT "SupplementaryLectureRequest_pkey" PRIMARY KEY ("userId","officialLectureId")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodSetting" (
    "id" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "PeriodSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LectureException" (
    "id" SERIAL NOT NULL,
    "originalDate" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "newDate" TIMESTAMP(3),
    "description" TEXT,
    "officialLectureId" INTEGER NOT NULL,

    CONSTRAINT "LectureException_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_university_email_key" ON "User"("university_email");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodSetting_period_key" ON "PeriodSetting"("period");

-- AddForeignKey
ALTER TABLE "OfficialLecture" ADD CONSTRAINT "OfficialLecture_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementaryLecture" ADD CONSTRAINT "SupplementaryLecture_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementaryLecture" ADD CONSTRAINT "SupplementaryLecture_officialLectureId_fkey" FOREIGN KEY ("officialLectureId") REFERENCES "OfficialLecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalEvent" ADD CONSTRAINT "PersonalEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementaryLectureAttendance" ADD CONSTRAINT "SupplementaryLectureAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementaryLectureAttendance" ADD CONSTRAINT "SupplementaryLectureAttendance_supplementaryLectureId_fkey" FOREIGN KEY ("supplementaryLectureId") REFERENCES "SupplementaryLecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementaryLectureRequest" ADD CONSTRAINT "SupplementaryLectureRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplementaryLectureRequest" ADD CONSTRAINT "SupplementaryLectureRequest_officialLectureId_fkey" FOREIGN KEY ("officialLectureId") REFERENCES "OfficialLecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureException" ADD CONSTRAINT "LectureException_officialLectureId_fkey" FOREIGN KEY ("officialLectureId") REFERENCES "OfficialLecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
