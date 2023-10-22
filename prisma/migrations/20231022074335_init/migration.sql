/*
  Warnings:

  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AntiFraud" AS ENUM ('IP', 'UA', 'USERID');

-- DropTable
DROP TABLE "Share";

-- CreateTable
CREATE TABLE "CodeShare" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimed" INTEGER NOT NULL DEFAULT 0,
    "public" TEXT NOT NULL,
    "antiFraud" "AntiFraud" NOT NULL DEFAULT 'IP',
    "total" INTEGER NOT NULL,

    CONSTRAINT "CodeShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "shareId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimedAt" TIMESTAMP(3),
    "text" TEXT NOT NULL,
    "claimUserId" TEXT,
    "claimIp" TEXT,
    "claimUa" TEXT,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkShare" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimed" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT NOT NULL,

    CONSTRAINT "LinkShare_pkey" PRIMARY KEY ("id")
);
