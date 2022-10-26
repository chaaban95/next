/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Question";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pollId" TEXT NOT NULL,
    "choice" TEXT NOT NULL
);
