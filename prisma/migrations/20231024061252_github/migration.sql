/*
  Warnings:

  - Added the required column `userId` to the `LinkShare` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" TEXT;

-- AlterTable
ALTER TABLE "LinkShare" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_claimUserId_fkey" FOREIGN KEY ("claimUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkShare" ADD CONSTRAINT "LinkShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
