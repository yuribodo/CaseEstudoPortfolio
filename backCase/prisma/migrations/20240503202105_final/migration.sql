/*
  Warnings:

  - Added the required column `projectId` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);
INSERT INTO "new_Feature" ("id", "name") SELECT "id", "name" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
