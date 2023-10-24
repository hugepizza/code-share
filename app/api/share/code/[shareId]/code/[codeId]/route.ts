import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/app/server/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

async function POST(
  request: NextRequest,
  { params }: { params: { shareId: string; codeId: string } }
) {
  const id = parseInt(params.codeId, 10);
  const session = await getServerSession(authOptions);
  const ip =
    request.ip ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for");
  const ua = request.headers.get("User-Agent");

  if (!id || !ip) {
    return NextResponse.json({}, { status: 401 });
  }
  const share = await prisma.codeShare.findFirstOrThrow({
    where: { id: params.shareId },
  });
  const ipClaimed = await prisma.code.count({
    where: { shareId: params.shareId, claimIp: ip },
  });
  if (ipClaimed > 0) {
    return NextResponse.json({
      err: "Your IP Have Claimed One Code Already",
    });
  }
  if (session?.user) {
    const userClaimed = await prisma.code.count({
      where: { shareId: params.shareId, claimUserId: session.user.id },
    });
    if (userClaimed > 0) {
      return NextResponse.json({
        err: "Your Account Have Claimed One Code Already",
      });
    }
  }
  if (share.antiAbuse === "USERID" && !session?.user) {
    return NextResponse.json({
      err: "Only Logged-in User Can Claim This Code",
    });
  }

  const codeUpdate = prisma.code.update({
    where: {
      id,
      shareId: params.shareId,
      claimedAt: { equals: null },
    },
    data: {
      claimedAt: new Date(),
      claimIp: ip,
      claimUa: ua,
      claimUserId: session?.user?.id,
    },
  });
  const shareUpdate = prisma.codeShare.update({
    where: { id: params.shareId },
    data: { claimed: { increment: 1 } },
  });
  const results = await prisma.$transaction([codeUpdate, shareUpdate]);
  if (!results[0].text) {
    return NextResponse.json({ err: "some thing wrong..." });
  }
  return NextResponse.json({ result: results[0].text });
}

export { POST };
