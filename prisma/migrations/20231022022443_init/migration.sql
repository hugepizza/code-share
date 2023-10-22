-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "claimed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);
