/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Question` table. All the data in the column will be lost.
  - Added the required column `choice` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `choices` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pollId" TEXT NOT NULL,
    "choice" TEXT NOT NULL
);
INSERT INTO "new_Question" ("id", "pollId") SELECT "id", "pollId" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Poll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "choices" TEXT NOT NULL
);
INSERT INTO "new_Poll" ("createdAt", "id", "title", "updatedAt") SELECT "createdAt", "id", "title", "updatedAt" FROM "Poll";
DROP TABLE "Poll";
ALTER TABLE "new_Poll" RENAME TO "Poll";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
