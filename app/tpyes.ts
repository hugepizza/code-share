import { Prisma } from "@prisma/client";

export type CodeShare = Prisma.CodeShareGetPayload<{
  include: { user: true; codes: { include: { user: true } } };
}>;
