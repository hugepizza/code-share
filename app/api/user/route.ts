import prisma from "@/app/server/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/auth";

async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ err: "Not Sign In" });
  }
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const publishedToday = await prisma.codeShare.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: startOfDay },
    },
  });
  return NextResponse.json({ publishedToday });
}

export { GET };
