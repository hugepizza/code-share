import { timeDifference } from "@/utils/date";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import "./styles.css";
import ClaimToast from "@/app/components/CopyBoardMoadl";
import { CodeShare } from "@/app/tpyes";
import CopyBoardMoadl from "@/app/components/CopyBoardMoadl";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import ClaimBoard from "@/app/components/ClaimBoard";
import prisma from "@/app/server/prisma";
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const share = await prisma.codeShare.findFirst({
    where: { id: params.slug },
  });
  return {
    title: share?.title,
    description: share?.title,
  };
}

export default async function Code({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const share = await prisma.codeShare.findFirst({
    where: { id: slug },
    include: {
      user: true,
      codes: { include: { user: true } },
    },
  });
  if (!share) {
    return <>404</>;
  }

  share.codes.forEach((ele) => (ele.text = maskMiddle(ele.text)));
  return (
    <section className="flex flex-col w-full overflow-y-auto">
      <div className="flex flex-col m-4 pb-4 border-b border-gray-200">
        <h1 className="text-2xl">{share?.title}</h1>
        <p className="text-sm mt-1 font-light text-slate-500">
          <Link href={`/user/${share.user.id}/share/code`}>
            {share.user.name} •{" "}
          </Link>
          {`${timeDifference(new Date(share.createdAt))[0]} ${
            timeDifference(new Date(share.createdAt))[1]
          } ago`}
        </p>
      </div>

      <div className="flex flex-col mx-4 my-2 default-style">
        <ReactMarkdown>{share.describe}</ReactMarkdown>
      </div>
      <ClaimBoard share={share} />
    </section>
  );
}

function maskMiddle(str: string) {
  if (str.length > 8) {
    str = str.slice(0, 8);
  }

  const length = str.length;
  const maskLength = Math.floor(length / 2);

  const masked = "*".repeat(maskLength);
  const suffix = str.slice(maskLength);

  return masked + suffix + (str.length > 8 ? "..." : "");
}
