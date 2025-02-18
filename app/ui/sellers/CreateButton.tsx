import Link from "next/link";

export default function CreateButton(){

    return(
    <div className="flex justify-center items-center mt-20">
        <Link href={`/sellers/add-product`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add a new product</Link>
    </div>
    
)
}