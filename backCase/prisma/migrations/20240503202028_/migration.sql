/*
  Warnings:

  - You are about to drop the column `projectId` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Technology` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Feature" ("id", "name") SELECT "id", "name" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
CREATE TABLE "new_Technology" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Technology" ("id", "name") SELECT "id", "name" FROM "Technology";
DROP TABLE "Technology";
ALTER TABLE "new_Technology" RENAME TO "Technology";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
