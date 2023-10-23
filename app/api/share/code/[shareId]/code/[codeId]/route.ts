import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/app/server/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function POST(
  request: NextRequest,
  { params }: { params: { shareId: string; codeId: string } }
) {
  const id = parseInt(params.codeId, 10);
  const session = await getServerSession(authOptions);
  let ip = request.ip ?? request.headers.get("x-real-ip");
  const ua = request.headers.get("User-Agent");
  if (!id || (!session?.user && !ip && !ua)) {
    return NextResponse.json({}, { status: 401 });
  }
  const result = await prisma.code.update({
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

  return NextResponse.json({ result: result.text });
}

export { POST };
