"use client";
import CopyBoardMoadl from "@/app/components/CopyBoardMoadl";
import { DAILY_SHARE } from "@/app/constant";
import { publishCodeShare } from "@/app/server/actions/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function PublishCode() {
  const [antiAbuse, setAntiAbuse] = useState("IP");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [title, setTitle] = useState("");
  const [describe, setDiscribe] = useState("");
  const [codes, setCodes] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [submitEnable, setSubmitEnable] = useState(false);
  const [submitText, setSubmitText] = useState("submit");
  const router = useRouter();
  const { data, isLoading, error } = useSWR("/api/user", (url) =>
    fetch(url, { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.err) {
          throw new Error(resp.err);
        }
        return resp;
      })
      .then((resp) => {
        if (resp.publishedToday < DAILY_SHARE) {
          setSubmitEnable(true);
        } else {
          setSubmitText(`Max ${DAILY_SHARE} Shares a Day`);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
  );
  const showModal = (url: string) => {
    (
      window?.document?.getElementById("show_share_url") as HTMLDialogElement
    )?.showModal();
    setShareUrl(`https://sharecode.fun/code/${url}`);
  };
  return (
    <section className="flex flex-col w-full overflow-y-auto">
      <dialog id="show_share_url" className="modal">
        <CopyBoardMoadl
          title="your sharing url"
          content={shareUrl}
          cleanup={() => {
            window.location.href = "/publish/code";
          }}
        />
      </dialog>
      <div className=" bg-slate-100 p-4 m-4 border-[1px] border-solid rounded-md">
        <strong>Notice</strong>
        <ul className="list-disc list-inside">
          <li>
            {"Developers are welcome to share their product promo codes."}
          </li>
          <li>
            {
              "Also welcome to share any promo codes you've collected for various purposes!"
            }
          </li>
          {/* <li className="list-disc list-inside">
            You can also share your invite link in{" "}
            <a href="/link" className="underline text-blue-500">
              <strong>Publish Link</strong>
            </a>
          </li> */}
        </ul>
      </div>
      <div className=" flex flex-col  px-4 mb-4 w-full">
        <label className="label-text mb-1">Title</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-ghost w-full input-md px-2 focus:border-none rounded-md"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
      </div>
      <div className=" flex flex-col px-4 mb-2 w-full">
        <label className="label-text mb-1">Describe (optional)</label>
        <textarea
          className="textarea textarea-bordered textarea-md px-2 py-1 focus:border-none rounded-md"
          placeholder=" Your homepage, usage, etc."
          value={describe}
          onChange={(e) => {
            setDiscribe(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      <div className=" flex flex-col px-4 mb-2 w-full">
        <label className="label-text mb-1">Codes</label>
        <textarea
          className="textarea textarea-bordered textarea-md px-2 py-1 focus:border-none rounded-md"
          placeholder="Input your codes, one code a line, 100 codes max, code length less 4 or more than 256 will be ignored"
          value={codes}
          onChange={(e) => {
            setCodes(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      <div className=" flex flex-col px-4 mb-2 w-full">
        <label className="label-text mb-1">Visibility</label>
        <Radio
          name="visibility"
          labal="Public"
          value="PUBLIC"
          secondLabel="show in sharing list"
          selected={visibility}
          setSelected={setVisibility}
        />
        <Radio
          name="visibility"
          labal="From URL"
          value="URL"
          secondLabel="can only get code from url"
          selected={visibility}
          setSelected={setVisibility}
        />
      </div>
      <div className=" flex flex-col px-4 mb-2 w-full">
        <label className="label-text mb-1">Anti Abuse</label>
        <Radio
          name="antiAbuse"
          labal="IP"
          value="IP"
          secondLabel="each IP address can claim only once"
          selected={antiAbuse}
          setSelected={setAntiAbuse}
        />
        <Radio
          name="antiAbuse"
          labal="Logged-In User"
          value="USERID"
          secondLabel="only logined user can claim"
          selected={antiAbuse}
          setSelected={setAntiAbuse}
        />
        <button
          className={`btn bg-blue-500 hover:bg-blue-600 ${
            !submitEnable ? "btn-disabled" : ""
          }`}
          onClick={async () => {
            if (!title.trim()) {
              toast.error("title is required");
              return;
            }
            if (!codes.trim()) {
              toast.error("no avaliable codes submitted");
              return;
            }
            setSubmitEnable(false);
            const uniqueCodes = [
              ...Array.from(new Set(codes.trim().split("\n"))),
            ];
            const myPromise = publishCodeShare({
              title,
              describe,
              antiAbuse,
              visibility,
              codes: uniqueCodes,
            })
              .then((res) => {
                if (res?.err) {
                  throw new Error(res.err);
                }
                return res;
              })
              .then((res) => {
                showModal(res.url!);
              })
              .catch((err) => {
                throw err;
              });

            toast
              .promise(myPromise, {
                loading: "Loading...",
                success: "Success",
                error: (data) => data.toString(),
              })
              .catch((err) => console.log(err));
          }}
        >
          {submitText}
        </button>
      </div>
    </section>
  );
}

function Radio({
  name,
  labal,
  value,
  secondLabel,
  selected,
  setSelected,
}: {
  name: string;
  labal: string;
  value: string;
  secondLabel: string;
  selected: string;
  setSelected: (v: string) => void;
}) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">
          {labal}
          <span className="label-text-alt text-slate-400"> {secondLabel}</span>
        </span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected === value}
          onChange={(e) => setSelected(e.target.value)}
          className="radio checked:bg-blue-500"
        />
      </label>
    </div>
  );
}
