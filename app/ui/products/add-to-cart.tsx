'use client'

// import { sendProductToCart } from "@/app/lib/data";
import { formHandlerActionCart } from "@/app/_actions/formHandlerAddCart";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { Cart, CartSchema } from "@/app/_schemas/addCart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function getOptions(product_quantity:number) {

  const options: any[] = [];

  for (let i = 0; i <= product_quantity; i++) {
    const opt = <option key={i} value={i}>{i}</option>
    options.push(opt)
  }

  return options;
}

export default function AddToCart({
  product_id, 
  user_id, 
  product_quantity, 
  }: {
    product_id: string;
    user_id: string;
    product_quantity: number;
  }) {

    const {register, handleSubmit, formState:{errors, isSubmitting}}= useForm<Cart>({
      resolver: zodResolver(CartSchema),
      defaultValues:{
          product_id: `${product_id}`,
          user_id: `${user_id}`,
          quantity: ""
      },
      mode: 'onChange'
    })
  
    const onSubmit = async (cart: Cart)=>{
        const {successMsg} = await formHandlerActionCart(cart, product_quantity);
        if(successMsg){
            toast.success(successMsg);
            redirect(`/products/${product_id}`)
        }
    }
  const options = getOptions(product_quantity)

  if(product_quantity === 0){
    return <div>Sold out</div>
  }else {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="quantity-selected" className="text-md mt-2">Choose a Quantity</label>
            <select 
              id="quantity" 
              className="w-12"
              aria-describedby="quantity-error"
              {...register('quantity')}
            >
              {options.map(option => {
                return option
              })}
            </select>
            {errors?.quantity &&(
                <small className="text-red-400">{errors.quantity?.message}</small>
            )}
          </div>
          <div>
            <input hidden id="product_id" defaultValue={product_id} {...register('product_id')}></input>
            <input hidden id="user_id" defaultValue={user_id} {...register('user_id')}></input>
            {errors?.user_id &&(
                <small className="text-red-400">{errors.user_id?.message}</small>
            )}
          </div>

          <button type="submit" className="flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" >
          {isSubmitting ? 'adding...' : 'Add to the cart'}
          </button>

      </form>
    )
  }
}