import "../globals.css";
import List from "../components/List";
import prisma from "../server/prisma";
import SharePage from "../components/SharePage";
export type Share = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  claimed: number;
  publisher: string;
  total?: number;
};

export default async function Share({
  searchParams: { page, order },
  params: { slug },
}: {
  searchParams: { page?: string; order?: string };
  params: { slug: string };
}) {
  return (
    <SharePage
      params={{ slug: slug }}
      searchParams={{ page: page, order: order }}
      scope="public"
    />
  );
}
