// import { Suspense } from "react";
import { Metadata } from "next";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: 'Login'
}

export default async function LoginPage() {

  return (
    <>
      <form action={async()=>{
        "use server";
        await signIn('github', {redirectTo: "/"})
      }}>
        <button type="submit">Continue with Github</button>
      </form>
      <form action={async()=>{
        "use server";
        await signIn('google', {redirectTo: "/"})
      }}>
        <button type="submit">Continue with Google</button>
      </form>
    </>
  );
}