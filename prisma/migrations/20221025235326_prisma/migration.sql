/*
  Warnings:

  - You are about to alter the column `pollId` on the `Vote` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pollId" INTEGER NOT NULL,
    "choice" TEXT NOT NULL
);
INSERT INTO "new_Vote" ("choice", "id", "pollId") SELECT "choice", "id", "pollId" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
