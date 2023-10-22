import Share from "./[slug]/page";

export default function Home() {
  return (
    <Share
      searchParams={{ page: "1", order: undefined }}
      params={{ slug: "" }}
    />
  );
}
