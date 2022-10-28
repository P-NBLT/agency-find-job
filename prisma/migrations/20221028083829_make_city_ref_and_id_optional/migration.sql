-- DropForeignKey
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_cityId_fkey";

-- AlterTable
ALTER TABLE "Agency" ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
