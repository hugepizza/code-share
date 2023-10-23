"use client";
import toast, { Toast } from "react-hot-toast";

export default function ClaimToast({
  content,
  t,
}: {
  t: Toast;
  content: string;
}) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } flex-col p-4  max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <p>Here is your code</p>
      <div className="bg-slate-100 py-4 px-2 my-2">{content}</div>
      <div className="flex flex-row space-x-2 justify-end">
        <button
          className="btn btn-sm text-blue-500"
          onClick={async (e) => {
            e.currentTarget.innerText = "COPIED";
            await navigator.clipboard.writeText(content);
          }}
        >
          COPY
        </button>
        <button className="btn btn-sm" onClick={() => toast.remove(t.id)}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
