"use client";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default function Signin() {
  const providers = authOptions.providers;
  const google = providers.find((ele) => ele.name === "Google");
  const github = providers.find((ele) => ele.name === "GitHub");
  return (
    <div className="flex w-screen flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-blue-600 flex items-center justify-center text-white text-3xl p-4 md:p-0">
        <p>Welcome to Share & Connect!</p>
      </div>
      <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4 md:p-0">
        <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg w-full md:w-3/4">
          <h2 className="text-2xl mb-6 text-center font-semibold">
            Sign in ShareCode
          </h2>
          {google && (
            <button
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md mb-4 flex items-center justify-center"
              onClick={() => {
                signIn(google.id, { callbackUrl: "/" });
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="4" fill="#F2F2F2" />
                <g clipPath="url(#clip0_710_6227)">
                  <path
                    d="M29.6 20.2273C29.6 19.5182 29.5364 18.8364 29.4182 18.1818H20V22.05H25.3818C25.15 23.3 24.4455 24.3591 23.3864 25.0682V27.5773H26.6182C28.5091 25.8364 29.6 23.2727 29.6 20.2273Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M20 30C22.7 30 24.9636 29.1045 26.6181 27.5773L23.3863 25.0682C22.4909 25.6682 21.3454 26.0227 20 26.0227C17.3954 26.0227 15.1909 24.2636 14.4045 21.9H11.0636V24.4909C12.7091 27.7591 16.0909 30 20 30Z"
                    fill="#34A853"
                  />
                  <path
                    d="M14.4045 21.9C14.2045 21.3 14.0909 20.6591 14.0909 20C14.0909 19.3409 14.2045 18.7 14.4045 18.1V15.5091H11.0636C10.3864 16.8591 10 18.3864 10 20C10 21.6136 10.3864 23.1409 11.0636 24.4909L14.4045 21.9Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M20 13.9773C21.4681 13.9773 22.7863 14.4818 23.8227 15.4727L26.6909 12.6045C24.9591 10.9909 22.6954 10 20 10C16.0909 10 12.7091 12.2409 11.0636 15.5091L14.4045 18.1C15.1909 15.7364 17.3954 13.9773 20 13.9773Z"
                    fill="#E94235"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_710_6227">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(10 10)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span className="ml-4">Sign in with Google</span>
            </button>
          )}
          {github && (
            <button
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-md flex items-center justify-center"
              onClick={() => {
                signIn(github.id, { callbackUrl: "/" });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="40"
                height="40"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <span className="ml-4">Sign in with GitHub</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
