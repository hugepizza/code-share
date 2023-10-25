"use client";
import toast from "react-hot-toast";
import { CodeShare } from "../tpyes";
import { useState } from "react";
import { revalidatePath } from "next/cache";
import CopyBoardMoadl from "./CopyBoardMoadl";
import { routeModule } from "next/dist/build/templates/app-page";
import { useRouter } from "next/navigation";

export default function ClaimBoard({ share }: { share: CodeShare }) {
  const [claimingCode, setClaimingCode] = useState("");
  const router = useRouter();
  const showModal = (code: string) => {
    (
      window?.document?.getElementById("show_code") as HTMLDialogElement
    )?.showModal();
    setClaimingCode(code);
  };
  return (
    <>
      <dialog id="show_code" className="modal">
        <CopyBoardMoadl
          content={claimingCode}
          cleanup={() => {
            setClaimingCode("");
            router.refresh();
          }}
        />
      </dialog>
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
                          revalidatePath(`/code/${share.id}`);
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
    </>
  );
}
