import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import SharePage from "@/app/components/SharePage";
import { getServerSession } from "next-auth";

export default async function UserShare({
  searchParams: { page, order },
  params: { slug, userId },
}: {
  searchParams: { page?: string; order?: string };
  params: { slug: string; userId: string };
}) {
  const session = await getServerSession(authOptions);
  const scope = session?.user && session.user.id === userId ? "self" : "user";

  return (
    <SharePage
      params={{ slug: slug }}
      searchParams={{ page: page, order: order }}
      scope={scope}
      userId={userId}
    />
  );
}
