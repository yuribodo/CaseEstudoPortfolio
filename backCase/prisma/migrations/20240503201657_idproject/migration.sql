/*
  Warnings:

  - Added the required column `projectId` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FeatureToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FeatureToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FeatureToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToProject_AB_unique" ON "_FeatureToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToProject_B_index" ON "_FeatureToProject"("B");
