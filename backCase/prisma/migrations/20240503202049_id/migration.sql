/*
  Warnings:

  - Added the required column `projectId` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Technology" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);
INSERT INTO "new_Technology" ("id", "name") SELECT "id", "name" FROM "Technology";
DROP TABLE "Technology";
ALTER TABLE "new_Technology" RENAME TO "Technology";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
