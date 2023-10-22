/*
  Warnings:

  - You are about to drop the column `antiFraud` on the `CodeShare` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AntiAbuse" AS ENUM ('IP', 'UA', 'USERID');

-- AlterTable
ALTER TABLE "CodeShare" DROP COLUMN "antiFraud",
ADD COLUMN     "antiAbuse" "AntiAbuse" NOT NULL DEFAULT 'IP';

-- DropEnum
DROP TYPE "AntiFraud";
