// 'use client'

// import Image from "next/image";
// import { addProductToCart, State } from "@/app/lib/actions";
// import { ProductsInfo, ProductToCart } from "@/app/lib/definitions";
// import { useActionState } from 'react';
// import Button from "../button";

// function getOptions(quantity:number) {
//   const options: any[] = [];

//   for (let i = 0; i <= quantity; i++) {
//     const opt = <option key={i} value={i}>{i}</option>
//     options.push(opt)
//   }

//   return options;
// }

// export default function GetProductForm({
//   product, 
//   user_id, 
//   }: {
//     product: ProductsInfo;
//     user_id: string;
//   }) {

//   const options = getOptions(product.product_quantity)

//   const initialState: State = { message: null, errors: {}}
//   const [ state, formAction ] = useActionState(addProductToCart, initialState); 

//   const onSubmit = async (product: ProductToCart) => { 
//       console.log(product)
//     }

//   return (
//     <form action={formAction}>
//       <div>
//         <div>
//           <Image 
//             src={`/products/${product.product_image}`}
//             alt={product.product_name} 
//             width={400}
//             height={400}>
//           </Image>
//           <div>
//             <h2 className="text-lg font-semibold">{product.product_name}</h2>
//             <p className="text-sm text-gray-600">Description: {product.product_description}</p>
//             <p className="text-md font-bold mt-2">R${product.product_price}</p>
//             <p className="text-md  mt-2">Seller: {product.name}</p>
//           </div>
//           <div>
//             <label htmlFor="quantity-selected" className="text-md mt-2">Choose a Quantity</label>
//             <select 
//               name="product_quantity" 
//               id="quantity" 
//               className="w-12"
//               defaultValue=""
//               aria-describedby="quantity-error"
//             >
//               {options.map(option => {
//                 return option
//               })}
//             </select>
//           </div>
//           <div>
//             <input hidden id="product_id" name="product_id" defaultValue={product.product_id} ></input>
//             <input hidden id="user_id" name="user_id" defaultValue={user_id} ></input>
//           </div>
//           <div>
//             <Button type="submit" className="flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" >
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     </form>
//   )
// }