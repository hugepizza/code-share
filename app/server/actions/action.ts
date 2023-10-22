"use server";

import { Share } from "@/app/[slug]/page";
import prisma from "../prisma";
import { Prisma, AntiAbuse, Visibility } from "@prisma/client";
import { error } from "console";

type CodeShareInput = {
  title: string;
  describe: string;
  codes: string[];
  antiAbuse: string;
  visibility: string;
};
export async function publishCodeShare(input: CodeShareInput) {
  prisma.codeShare
    .create({
      data: {
        title: input.title,
        describe: input.describe,
        antiAbuse: input.antiAbuse as AntiAbuse,
        visibility: input.visibility as Visibility,
        total: input.codes.length,
        codes: {
          create: input.codes.map((ele) => ({
            text: ele,
          })),
        },
      },
    })
    .then()
    .catch((error) => {
      console.log("publishCodeShare error", error);
      throw error;
    });
}
