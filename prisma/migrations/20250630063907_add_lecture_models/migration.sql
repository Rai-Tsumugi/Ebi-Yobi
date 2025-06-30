-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'INTENSIVE');

-- CreateTable
CREATE TABLE "TimeSchedule" (
    "period" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "TimeSchedule_pkey" PRIMARY KEY ("period")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "period" INTEGER NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_day_period_room_key" ON "Lecture"("day", "period", "room");

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_period_fkey" FOREIGN KEY ("period") REFERENCES "TimeSchedule"("period") ON DELETE RESTRICT ON UPDATE CASCADE;
