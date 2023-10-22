/*
  Warnings:

  - The `visibility` column on the `CodeShare` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'URL');

-- AlterTable
ALTER TABLE "CodeShare" DROP COLUMN "visibility",
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';

-- DropEnum
DROP TYPE "visibility";
