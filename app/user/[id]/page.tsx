import { changeUserStatus, getUserById } from "@/app/lib/data";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";


const Page= async ({params}: {params: Promise<{id: string}>}) =>{
    
    const id = (await params).id

    const user = await getUserById(Number(id))
    if(!user) return notFound()
    return <>
        <section>
            <div>
                <div>
                    <h3>
                        {user[0].name}
                    </h3>
                </div>
                <Image
                    src={user[0].image}
                    alt={user[0].name}
                    width={220}
                    height={220}
                />
                <p>
                    {user[0].email}
                </p>
                
                {user[0].status !== "seller" ? (
                    <>
                        <form action={async()=>{
                            "use server"
                            await changeUserStatus(Number(user[0].id))
                            redirect(`/user/${user[0].id}`)
                        }}>
                            <p>Become in a seller by clicking this button</p>
                            <button type="submit">Seller</button>
                        </form>
                    </>
                ) : (
                    <p>Youre a Seller</p>
                )}
            </div>
        </section>
    </>
}

export default Page;