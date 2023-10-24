"use client";
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

export default function Code({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [claimingCode, setClaimingCode] = useState("");
  const {
    data: share,
    isLoading,
    mutate,
  } = useSWR(["/api/share/code/", slug], ([url, slug]) =>
    fetch(url + slug, { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => resp.share as CodeShare)
      .then((resp) => {
        resp.codes = resp.codes.map((ele) => ({
          ...ele,
          text: ele.text.length > 16 ? ele.text.slice(0, 16) + "..." : ele.text,
        }));
        return resp;
      })
  );
  const showModal = (code: string) => {
    (
      window?.document?.getElementById("show_code") as HTMLDialogElement
    )?.showModal();
    console.log("code", code);

    setClaimingCode(code);
  };

  if (isLoading || !share) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <span>loading...</span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="flex flex-col w-full overflow-y-auto">
      <dialog id="show_code" className="modal">
        <CopyBoardMoadl
          content={claimingCode}
          cleanup={() => {
            setClaimingCode("");
          }}
        />
      </dialog>

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
      <div className=" bg-slate-100 p-4 m-4 border-[1px] border-solid rounded-md">
        <ol className="formatted-ol">
          {share.codes.map((ele) => (
            <div key={ele.text} className="">
              {ele.claimedAt ? (
                <li className="formatted-li relative">
                  <span className="">{ele.text}</span>
                  <span className="text-stone-400 ml-4 absolute right-0">
                    Claimed By{" "}
                    {ele.claimUserId ? ele.user?.name : "Anonymous user"}
                  </span>
                </li>
              ) : (
                <li className="formatted-li relative ">
                  <span className="">{ele.text}</span>
                  <span
                    className="text-blue-500 ml-4  absolute right-0"
                    onClick={() => {
                      const fetchPromise = fetch(
                        `/api/share/code/${ele.shareId}/code/${ele.id}`,
                        { method: "POST" }
                      )
                        .then((resp) => resp.json())
                        .then((resp) => {
                          if (resp.err) {
                            throw Error(resp.err);
                          } else {
                            return resp.result;
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          throw err;
                        });
                      toast
                        .promise(fetchPromise, {
                          loading: "Loading...",
                          success: "success",
                          error: (data) => `${data.toString()}`,
                        })
                        .then((data) => {
                          showModal(data);
                        })
                        .then(() => {
                          mutate();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Claim
                  </span>
                </li>
              )}
            </div>
          ))}
        </ol>
      </div>
    </section>
  );
}
