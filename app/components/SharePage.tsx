import "../globals.css";
import List from "../components/List";
import prisma from "../server/prisma";
import { log } from "console";
export type Share = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  claimed: number;
  publisher: string;
  total?: number;
};

const PAGE_COUNT = 30;
export default async function SharePage({
  searchParams: { page, order },
  params: { slug },
  scope,
  userId,
}: {
  searchParams: { page?: string; order?: string };
  params: { slug: string };
  scope: "public" | "user" | "self";
  userId?: string;
}) {
  const baseUrl =
    scope === "public" ? `/${slug}` : `/user/${userId}/share/${slug}`;
  const currentPage = parseInt(page || "", 10) || 1;
  const type = slug === "link" ? "link" : "code";
  let shares: Share[] = [];
  let maxPage = 1;
  const take = PAGE_COUNT;
  console.log("scope", scope);
  console.log("userId", userId);

  const where =
    scope === "user" || (scope === "self" && userId) ? { userId: userId } : {};
  const skip = (currentPage - 1) * PAGE_COUNT;

  const orderBy = { claimed: "desc" };
  if (type === "code") {
    const codes = await prisma.codeShare.findMany({
      where: {
        ...where,
        ...{ visibility: scope === "self" ? undefined : "PUBLIC" },
      },
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    shares = codes.map((ele) => ({
      id: ele.id,
      title: ele.title,
      content: ele.describe,
      createdAt: ele.createdAt,
      claimed: ele.claimed,
      total: ele.total,
      publisher: ele.user.name || "unknow",
    }));

    maxPage = Math.ceil(
      (await prisma.codeShare.count({
        where: {},
      })) / PAGE_COUNT
    );
  } else if (type === "link") {
    const codes = await prisma.linkShare.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    shares = codes.map((ele) => ({
      id: ele.id,
      title: ele.title,
      content: ele.describe,
      createdAt: ele.createdAt,
      claimed: ele.claimed,
      publisher: ele.user.name || "unknow",
    }));

    maxPage = Math.ceil(
      (await prisma.codeShare.count({
        where: {},
      })) / PAGE_COUNT
    );
  } else {
    return <></>;
  }

  // const pages = Array.from(
  //   { length: maxPage > 10 ? 10 : maxPage },
  //   (_, i) => i + 1
  // );

  return (
    <section className="flex h-full flex-col items-center w-full">
      <List {...{ baseUrl, type, shares, maxPage, currentPage }} />
    </section>
  );
}
