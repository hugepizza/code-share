"use client";
import { timeDifference } from "@/utils/date";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import "./styles.css";
import ClaimToast from "@/app/components/ClaimToast";
import { CodeShare } from "@/app/tpyes";

export default function Code({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const {
    data: share,
    isLoading,
    mutate,
  } = useSWR(["/api/share/code/", slug], ([url, slug]) =>
    fetch(url + slug, { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => resp.share as CodeShare)
  );
  if (isLoading || !share) {
    return <></>;
  }
  console.log(share);

  return (
    <section className="flex flex-col w-full overflow-y-auto">
      <div className="flex flex-col m-4 pb-4 border-b border-gray-200">
        <h1 className="text-2xl">{share?.title}</h1>
        <p className="text-sm mt-1 font-light text-slate-500">
          {share.user.name} •{" "}
          {`${timeDifference(new Date(share.createdAt))[0]} ${
            timeDifference(new Date(share.createdAt))[1]
          } ago`}
        </p>
      </div>

      <div className="flex flex-col mx-4 my-2 default-style">
        <ReactMarkdown>{share.describe}</ReactMarkdown>
      </div>
      <div className=" bg-slate-100 p-4 m-4 border-[1px] border-solid rounded-md">
        <ol className="formatted-ol">
          {share.codes.map((ele) => (
            <>
              {ele.claimedAt ? (
                <li className="formatted-li">
                  {ele.text}
                  <span className="text-stone-400 ml-4">
                    Claimed By{" "}
                    {ele.claimUserId ? ele.user?.name : "Anonymous user"}
                  </span>
                </li>
              ) : (
                <li key={ele.text} className="formatted-li">
                  {ele.text}
                  <span
                    className="text-blue-500 ml-4"
                    onClick={() => {
                      const fetchPromise = fetch(
                        `/api/share/code/${ele.shareId}/code/${ele.id}`,
                        { method: "POST" }
                      )
                        .then((resp) => resp.json())
                        .then((resp) => {
                          if (resp.message) {
                            throw Error(resp.message);
                          } else {
                            toast.custom((t) => (
                              <ClaimToast content={resp.result} t={t} />
                            ));
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          throw err;
                        });
                      toast
                        .promise(
                          fetchPromise,
                          {
                            loading: "Loading...",
                            success: (data) => {
                              toast.dismiss();
                              return "Success";
                            },
                            error: (data) => `${data.toString()}`,
                          },
                          {
                            success: {
                              duration: 300,
                            },
                          }
                        )
                        .then(() => mutate())
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Claim
                  </span>
                </li>
              )}
            </>
          ))}
        </ol>
      </div>
    </section>
  );
}
