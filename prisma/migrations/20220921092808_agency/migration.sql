/*
  Warnings:

  - You are about to drop the `Agencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Agencies";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Agency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);
