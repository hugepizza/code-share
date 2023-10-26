"use client";
import toast from "react-hot-toast";

export default function CopyBoardMoadl({
  content,
  cleanup,
  title,
}: {
  content: string;
  cleanup: () => void;
  title?: string;
}) {
  return (
    <div
      className={`modal-box flex-col p-4 max-w-md w-full bg-white shadow-lg rounded-lg  flex ring-1 ring-black ring-opacity-5`}
    >
      <p>{title ?? "Here is your code"}</p>
      <div className="bg-slate-100 py-4 px-2 my-2 break-words">{content}</div>
      <div className="flex flex-row space-x-2 justify-end">
        <button
          className="btn btn-sm text-blue-500"
          onClick={async (e) => {
            toast("copied!");
            await navigator.clipboard.writeText(content);
          }}
        >
          COPY
        </button>
        <form method="dialog">
          <button
            className="btn btn-sm"
            onClick={() => {
              cleanup();
            }}
          >
            Dismiss
          </button>
        </form>
      </div>
    </div>
  );
}
