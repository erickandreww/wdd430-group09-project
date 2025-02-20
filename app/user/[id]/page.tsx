import { changeUserStatus, getUserById } from "@/app/lib/data";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";


const Page= async ({params}: {params: Promise<{id: string}>}) =>{
    
    const id = (await params).id

    const user = await getUserById(Number(id))
    if(!user) return notFound()
    return <>
        <section>
            <div className="flex flex-col gap-4 place-items-center bg-color_two w-1/3 h-fit mx-auto rounded-md pb-5 overflow-hidden ">
                <div className="bg-color_three w-full h-full py-5">
                    <h3 className="text-white text-xl pb-2 text-center">
                        {user[0].name}
                    </h3>
                
                <Image
                    src={user[0].image}
                    alt={user[0].name}
                    width={220}
                    height={220}
                    className="w-1/4 h-15 object-cover rounded-full mx-auto border-solid border-2 border-black"
                />
                </div>
                <p className="text-color_three text-lg">
                    {user[0].email}
                </p>
                
                {user[0].status !== "seller" ? (
                    <>
                        <form action={async()=>{
                            "use server"
                            await changeUserStatus(Number(user[0].id))
                            redirect(`/user/${user[0].id}`)
                        }} className="place-items-center h-screen">
                            <p>Become in a seller by clicking this button</p>
                            <button type="submit" className="mt-3 text-lg bg-color_three hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Seller</button>
                        </form>
                    </>
                ) : (
                    <p className="text-slate-950">Youre a Seller</p>
                )}
            </div>
        </section>
    </>
}

export default Page;