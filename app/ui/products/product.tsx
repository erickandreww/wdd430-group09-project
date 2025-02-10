
import Image from "next/image";
import { auth } from "@/auth";
import { getProductById, GetUserIdByEmail } from "@/app/lib/data";

function getQuantity(quantity:number) {
  const options: object[] = [];

  for (let i = 0; i <= quantity; i++) {
    const opt = <option value={i}>{i}</option>
    options.push(opt)
  }

  return options;
}

export default async function GetProduct({id}: {id:string}) {
  const product = await getProductById(id);

  const session = await auth()
  const email = session?.user?.email
  const user_id = await GetUserIdByEmail(email);
  console.log(user_id)

  const quantity = getQuantity(product.product_quantity)
  console.log(quantity)

  return (
    <div className="" key={product.product_id}>
      <Image 
      src={`/products/${product.product_image}`}
      alt={product.product_name} 
      width={400}
      height={400}></Image>
      <div>
        <h2 className="text-lg font-semibold">{product.product_name}</h2>
        <p className="text-sm text-gray-600">{product.product_description}</p>
        <p className="text-xl font-bold mt-2">{product.product_price}</p>
        <p className="text-xl font-bold mt-2">{product.name}</p>
      </div>
      {/* <div className="grid grid-rows-2">
        <label htmlFor="quantity-selected" className="">Choose a Quantity</label>
        <select name="quantity" id="quantity" className="w-12">
          {quantity.map(option => {
            return option
          })}
        </select>
      </div> */}
      {/* <button onClick={(e) => {
        addProductToCart(user_id, "1", id)
      }}>Add to Cart</button> */}
    </div>
  )
}