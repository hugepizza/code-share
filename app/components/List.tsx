import Link from "next/link";
import { Share } from "../[slug]/page";
import { timeDifference } from "@/utils/date";

export default async function List({
  type,
  shares,
  maxPage,
  currentPage,
}: {
  type: string;
  shares: Share[];
  maxPage: number;
  currentPage: number;
}) {
  const pages = Array.from(
    { length: maxPage > 10 ? 10 : maxPage },
    (_, i) => i + 1
  );
  return (
    <div className="w-full h-full px-[18px]">
      <div className="w-full flex flex-row py-1 my-2 justify-between">
        <div className="flex space-x-4">
          <div
            className={`${
              type === "code"
                ? "border-blue-500 text-blue-500 border-b-[1px]"
                : ""
            }`}
          >
            <Link href="/">Codes</Link>
          </div>
          <div
            className={`${
              type === "link"
                ? "border-blue-500 text-blue-500 border-b-[1px] "
                : ""
            }`}
          >
            {/* <Link href="/link">Links</Link> */}
          </div>
        </div>
        <div className="font-semibold text-blue-500">
          <Link href={`/publish/${type}`}>Click to Share</Link>
        </div>
      </div>
      {shares.map((ele, index) => (
        <div
          key={ele.id}
          className={`w-full flex flex-row py-2 mb-1 justify-between ${
            index !== shares.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <div className="flex  flex-col h-full w-3/4">
            <p className=" pb-[3px] ">
              <Link
                className="block truncate hover:underline"
                href={`/${type}/${ele.id}`}
              >
                {ele.title}
              </Link>
            </p>
            <p className="text-xs font-light text-slate-500">
              {ele.publisher} •{" "}
              {`${timeDifference(ele.createdAt)[0]} ${
                timeDifference(ele.createdAt)[1]
              } ago`}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center h-full">
            {ele.claimed >= (ele.total || ele.claimed + 1) ? (
              <span className="ml-2 text-sm text-slate-400">{"All claimed"}</span>
            ) : (
              <>
                <span>{`${ele.claimed} / ${ele.total}`}</span>
                <span className="ml-2 text-sm text-slate-400">{"claimed"}</span>
              </>
            )}
          </div>
        </div>
      ))}
      {maxPage > 1 && (
        <div className="flex flex-row space-x-2 justify-end text-lg font-normal">
          {pages.map((ele) => (
            <Link
              className={` ${
                ele === currentPage ? "text-blue-500 underline" : ""
              }`}
              key={ele}
              href={`/code?page=${ele}`}
            >
              {ele}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
