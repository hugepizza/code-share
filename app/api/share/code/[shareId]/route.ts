import prisma from "@/app/server/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type CodeShare = Prisma.CodeShareGetPayload<{
  include: { user: true; codes: { include: { user: true } } };
}>;
async function GET(
  request: NextRequest,
  { params }: { params: { shareId: string } }
) {
  if (!params.shareId) {
    return NextResponse.json({}, { status: 404 });
  }
  const share = await prisma.codeShare.findFirst({
    where: { id: params.shareId },
    include: { codes: { include: { user: true } }, user: true },
  });
  share?.codes.forEach((ele) => (ele.text = maskMiddle(ele.text)));
  return NextResponse.json({ share });
}

function maskMiddle(str: string) {
  const length = str.length;
  const maskLength = Math.floor(length / 2);
  const start = Math.floor((length - maskLength) / 2);
  const end = start + maskLength;

  const prefix = str.slice(0, start);
  const suffix = str.slice(end);

  const masked = "*".repeat(maskLength);

  return prefix + masked + suffix;
}

export { GET };
