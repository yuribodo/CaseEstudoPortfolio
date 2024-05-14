/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__ProjectToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ProjectToTechnology" ("A", "B") SELECT "A", "B" FROM "_ProjectToTechnology";
DROP TABLE "_ProjectToTechnology";
ALTER TABLE "new__ProjectToTechnology" RENAME TO "_ProjectToTechnology";
CREATE UNIQUE INDEX "_ProjectToTechnology_AB_unique" ON "_ProjectToTechnology"("A", "B");
CREATE INDEX "_ProjectToTechnology_B_index" ON "_ProjectToTechnology"("B");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "goal" TEXT NOT NULL
);
INSERT INTO "new_Project" ("goal", "id", "name") SELECT "goal", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Technology" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Technology" ("id", "name") SELECT "id", "name" FROM "Technology";
DROP TABLE "Technology";
ALTER TABLE "new_Technology" RENAME TO "Technology";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
