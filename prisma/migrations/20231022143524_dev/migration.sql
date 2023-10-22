/*
  Warnings:

  - Added the required column `userId` to the `CodeShare` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeShare" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CodeShare" ADD CONSTRAINT "CodeShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
