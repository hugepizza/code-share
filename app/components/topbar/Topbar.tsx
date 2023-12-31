"use client";
import "./styles.css";
import "../../globals.css";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
export default function Topbar() {
  const session = useSession();
  return (
    <div
      className="navbar topbar bg-base-100 shadow-sm border-none"
      style={{
        paddingLeft: "var(--top-padding)",
        paddingRight: "var(--top-padding)",
      }}
    >
      <div className="navbar-start">
        <Link href="/">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 657.000000 117.000000"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "var(--top-logo-width)" }}
          >
            <g
              transform="translate(0.000000,117.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M408 1080 c-158 -19 -229 -63 -285 -176 -34 -70 -38 -85 -37 -153 1
-112 24 -156 139 -267 90 -87 114 -125 101 -159 -8 -23 -84 -55 -130 -55 -38
0 -38 -1 -33 -32 3 -18 9 -53 12 -77 l7 -44 87 6 c96 6 194 33 240 67 52 36
85 113 86 195 0 72 -8 94 -75 210 -40 71 -3 125 86 125 l36 0 -7 68 c-4 37
-14 119 -23 182 l-17 115 -60 1 c-33 1 -90 -2 -127 -6z"
              />
              <path
                d="M4080 1070 c-120 -21 -221 -73 -296 -152 -173 -183 -161 -439 31
-633 124 -125 284 -183 435 -157 39 7 86 19 105 27 l35 14 0 68 0 68 -89 0
c-83 0 -92 2 -132 30 -116 82 -117 186 -4 297 56 55 85 64 187 53 l71 -7 -6
124 c-3 68 -11 158 -18 201 l-11 77 -132 -1 c-72 -1 -151 -5 -176 -9z"
              />
              <path
                d="M2425 885 c-38 -7 -82 -18 -97 -24 l-28 -11 0 -108 c0 -98 31 -499
45 -579 l6 -33 119 0 c139 0 170 8 170 46 0 24 4 22 47 -30 26 -31 55 -56 65
-56 21 0 186 59 192 69 3 4 -22 40 -54 81 -33 41 -59 79 -60 84 0 4 25 35 55
67 81 88 101 170 69 278 -29 98 -148 184 -299 216 -84 18 -136 18 -230 0z
m287 -384 l33 -30 -20 -38 c-11 -20 -35 -46 -52 -56 l-33 -19 0 86 c0 79 2 86
20 86 11 0 34 -13 52 -29z"
              />
              <path
                d="M4794 879 c-65 -15 -144 -69 -180 -122 -112 -163 -65 -483 86 -585
88 -59 218 -66 308 -17 112 61 191 240 179 409 -9 144 -65 239 -170 291 -60
29 -158 40 -223 24z m121 -366 c27 -26 17 -155 -13 -185 -27 -28 -48 -18 -75
33 -21 39 -19 127 2 153 18 21 65 20 86 -1z"
              />
              <path
                d="M5348 883 l-58 -4 0 -359 0 -358 48 -19 c69 -26 189 -24 265 6 108
42 214 148 253 254 29 78 26 186 -8 259 -50 109 -138 179 -269 213 -51 14
-103 16 -231 8z m246 -384 c29 -14 56 -64 56 -106 0 -45 -54 -111 -92 -113 -5
0 -8 52 -8 115 0 66 4 115 10 115 5 0 20 -5 34 -11z"
              />
              <path
                d="M1188 863 c-16 -4 -18 -23 -18 -206 0 -116 -4 -196 -9 -188 -6 10
-13 11 -29 2 -11 -6 -22 -11 -24 -11 -2 0 -3 89 -3 197 l0 198 -130 3 c-71 2
-145 0 -162 -3 l-33 -6 1 -287 c1 -158 4 -318 8 -357 l6 -70 138 -3 137 -3 10
26 c6 15 10 47 11 73 0 26 3 41 6 35 7 -19 24 -16 49 8 l22 20 8 -83 9 -83
134 -3 c74 -1 138 1 142 5 17 17 39 310 39 512 0 198 -1 211 -19 221 -19 10
-258 12 -293 3z"
              />
              <path
                d="M1789 864 c-11 -3 -43 -106 -113 -360 -53 -195 -94 -359 -91 -364 4
-6 64 -10 141 -10 l135 0 12 28 c8 18 18 26 30 24 10 -2 25 2 33 9 19 16 31 3
36 -36 l3 -30 138 -3 c75 -1 137 1 137 5 0 16 -152 728 -157 733 -6 6 -284 10
-304 4z m136 -483 c3 -5 1 -12 -5 -16 -5 -3 -10 1 -10 9 0 18 6 21 15 7z"
              />
              <path
                d="M3080 861 c-34 -9 -35 -26 -16 -276 8 -115 18 -255 22 -310 10 -158
-10 -145 216 -145 106 0 203 3 216 6 20 6 22 12 22 85 l0 79 -75 0 c-73 0 -75
1 -75 25 0 24 3 25 58 25 31 0 62 4 68 8 14 8 34 76 34 115 l0 27 -80 0 c-73
0 -80 2 -80 20 0 17 8 19 82 22 l83 3 7 40 c4 22 7 95 7 163 l1 122 -232 -1
c-128 -1 -244 -4 -258 -8z"
              />
              <path
                d="M5990 861 c-34 -9 -35 -26 -16 -276 8 -115 18 -255 22 -310 10 -158
-10 -145 216 -145 106 0 203 3 216 6 20 6 22 12 22 85 l0 79 -75 0 c-73 0 -75
1 -75 25 0 24 3 25 58 25 31 0 62 4 68 8 14 8 34 76 34 115 l0 27 -80 0 c-73
0 -80 2 -80 20 0 17 8 19 82 22 l83 3 7 40 c4 22 7 95 7 163 l1 122 -232 -1
c-128 -1 -244 -4 -258 -8z"
              />
            </g>
          </svg>
        </Link>
      </div>
     
      <div className="navbar-end space-x-3">
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <span>EN</span>
            </li>
            <li>
              <span
                onClick={() => {
                  toast("coming soon");
                }}
              >
                ZH
              </span>
            </li>
          </ul>
        </div>

        <div className="">
          {session.status === "loading" ? (
            <span className="loading loading-spinner text-neutral"></span>
          ) : session.data?.user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="hover:text-blue-500">
                {session.data?.user.name}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
              >
                <li>
                  <Link href={`/user/${session.data.user.id}/share/code`}>
                    My Shares
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <span
              onClick={() => {
                signIn();
              }}
            >
              {"Sign In"}
            </span>
          )}

          {}
        </div>
      </div>
    </div>
  );
}
