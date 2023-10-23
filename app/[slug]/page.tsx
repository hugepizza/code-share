import "../globals.css";
import List from "../components/List";
import prisma from "../server/prisma";
export type Share = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  claimed: number;
  publisher: string;
  total?: number;
};

const PAGE_COUNT = 8;
export default async function Share({
  searchParams: { page, order },
  params: { slug },
}: {
  searchParams: { page?: string; order?: string };
  params: { slug: string };
}) {
  const currentPage = parseInt(page || "", 10) || 1;
  const type = slug === "link" ? "link" : "code";
  let shares: Share[] = [];
  let maxPage = 1;
  const take = PAGE_COUNT;
  const where = {};
  const skip = (currentPage - 1) * PAGE_COUNT;
  const orderBy = { claimed: "desc" };
  if (type === "code") {
    const codes = await prisma.codeShare.findMany({
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
      <List {...{ type, shares, maxPage, currentPage }} />
    </section>
  );
}
