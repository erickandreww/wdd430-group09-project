import { changeUserStatus, getUserById } from "@/app/lib/data";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const user = await getUserById(Number(id));
  if (!user) return notFound();

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4 place-items-center bg-color_two w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-2/4 h-fit mx-auto rounded-md pb-5 overflow-hidden">
        {/* Header Section */}
        <div className="bg-color_three w-full h-full py-5">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl pb-2 text-center">
            {user[0].name}
          </h3>

          {/* User Image */}
          <Image
            src={user[0].image}
            alt={user[0].name}
            width={220}
            height={220}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-full mx-auto border-solid border-2 border-black"
          />
        </div>

        {/* User Email */}
        <p className="text-color_three text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {user[0].email}
        </p>

        {/* Seller Status Section */}
        {user[0].status !== "seller" ? (
          <>
            <form
              action={async () => {
                "use server";
                await changeUserStatus(Number(user[0].id));
                redirect(`/user/${user[0].id}`);
              }}
              className="flex flex-col place-items-center"
            >
              <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
                Become a seller by clicking this button
              </p>
              <button
                type="submit"
                className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl bg-color_three hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Seller
              </button>
            </form>
          </>
        ) : (
          <p className="text-slate-950 text-sm sm:text-base md:text-lg lg:text-xl">
            You are a Seller
          </p>
        )}
      </div>
    </section>
  );
};

export default Page;