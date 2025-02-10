import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from 'next/link';
import { HiShoppingCart } from "react-icons/hi2";


export default async function Heading () {
  const session = await auth()
  console.log(session?.id)
  return (
    <header className="sticky top-0 z-50 flex flex-col items-center bg-color_three p-4 text-color_four md:flex-row md:justify-between md:items-center">
      <div className="flex items-center space-x-4">
        <Link href='/'>
          <Image src='/logo.png' alt='this is the logo of the page' width={100} height={100} className="rounded-full"/>
        </Link>
        <h1 className="text-3xl font-bold text-color_four">HandCrafted Haven</h1>
      </div>
      <div className="flex space-x-8">
        {session && session?.user ? (
          <>
            <form action={async() => {
              "use server"
              await signOut({redirectTo:"/"})
            }}>       
              <button type="submit">Logout</button> 
            </form>

            <Link href={`/user/${session?.id}`}>
              <span>{session?.user?.name}</span>
            </Link>

            <Link href='/cart' className="w-10 mt-2 md:mt-0"><HiShoppingCart size={22}/></Link>
          </>
        ) : (
          <Link href='/login' className="w-12 mt-2 font-medium text-color_four hover:text-color_five md:mt-0">Login</Link>
        )}
      </div>
    </header>
  );
}