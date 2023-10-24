"use server";

import prisma from "../prisma";
import { AntiAbuse, Visibility } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";
import { DAILY_SHARE } from "@/app/constant";

type CodeShareInput = {
  title: string;
  describe: string;
  codes: string[];
  antiAbuse: string;
  visibility: string;
};
export async function publishCodeShare(input: CodeShareInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { err: "sign in first" };
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const publishedToday = await prisma.codeShare.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: startOfDay },
    },
  });
  if (publishedToday >= DAILY_SHARE) {
    return { err: "over limit" };
  }
  const uniqueCodes = [
    ...Array.from(
      new Set(
        input.codes.filter(
          (ele) => ele != "" && ele.length >= 4 && ele.length <= 256
        )
      )
    ),
  ];
  if (uniqueCodes.length === 0) {
    return { err: "no available codes" };
  }
  try {
    const result = await prisma.codeShare.create({
      data: {
        userId: session.user.id,
        title: input.title,
        describe: input.describe,
        antiAbuse: input.antiAbuse as AntiAbuse,
        visibility: input.visibility as Visibility,
        total: input.codes.length,
        codes: {
          create: uniqueCodes.map((ele) => ({
            text: ele,
          })),
        },
      },
    });
    revalidatePath('/', 'page')
    revalidatePath('/[slug]', 'page')
    return { url: result.id };
  } catch (error) {
    if (error instanceof Error) {
      return { err: error.message };
    }
    return { err: "An unknown error occurred" };
  }
}
