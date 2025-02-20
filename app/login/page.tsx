// import { Suspense } from "react";
import { Metadata } from "next";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: 'Login'
}

export default async function LoginPage() {

  return (
        <div id="login-popup"
        className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow">
                <button type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
                        aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close popup</span>
                </button>

                <div className="p-5">
                    <h3 className="text-2xl mb-0.5 font-medium"></h3>
                    <p className="mb-4 text-sm font-normal text-gray-800"></p>

                    <div className="text-center">
                        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                            Login to your account
                        </p>
                        <p className="mt-2 text-sm leading-4 text-slate-600">
                            You must be logged in to perform this action.
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col gap-2">

                    <form action={async()=>{
                          "use server";
                          await signIn('github', {redirectTo: "/"})
                        }} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                          <button type="submit">Continue with Github</button>
                        </form>
                        <form action={async()=>{
                          "use server";
                          await signIn('google', {redirectTo: "/"})
                        }} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                          <button type="submit">Continue with Google</button>
                    </form>
                    </div>

                    <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                        <div className="h-px w-full bg-slate-200"></div>
                        OR
                        <div className="h-px w-full bg-slate-200"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


  );
}