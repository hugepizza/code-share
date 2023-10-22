/*
  Warnings:

  - You are about to drop the column `content` on the `CodeShare` table. All the data in the column will be lost.
  - You are about to drop the column `public` on the `CodeShare` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `LinkShare` table. All the data in the column will be lost.
  - Added the required column `describe` to the `CodeShare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `describe` to the `LinkShare` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "visibility" AS ENUM ('PUBLIC', 'URL');

-- AlterTable
ALTER TABLE "CodeShare" DROP COLUMN "content",
DROP COLUMN "public",
ADD COLUMN     "describe" TEXT NOT NULL,
ADD COLUMN     "visibility" "visibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "LinkShare" DROP COLUMN "content",
ADD COLUMN     "describe" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "CodeShare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
