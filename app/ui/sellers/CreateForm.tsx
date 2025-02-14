'use client';

import { formHandlerAction } from "@/app/_actions/formHandler";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { Product, productSchema } from "@/app/_schemas/product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Page({userId}: {userId: string}) {
    const {register, handleSubmit, formState:{errors, isSubmitting}}= useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues:{
            product_name: "",
            product_image: "",
            product_price: 0,
            product_description: "",
            product_quantity: 0,
            user_id: `${userId}`
        },
        mode: 'onChange'
    })

    const onSubmit = async (product: Product)=>{
        const {successMsg} = await formHandlerAction(product);
        if(successMsg){
            toast.success(successMsg);
            redirect("/sellers")
        }
    }
    if(!userId)redirect("/login")
  return <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="product_name">
            Product Name
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-md text-gray-900"
            id="product_name"
            aria-required
            {...register('product_name')}
          />
            {errors?.product_name &&(
              <small className="text-red-400">{errors.product_name.message}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_image">
            Product Image URL
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-md text-gray-900"
            id="product_image"
            aria-required
            {...register('product_image')}
          />
            {errors?.product_image &&(
              <small className="text-red-400">{errors.product_image.message}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_price">
            Product Price
          </label>
          <input
            type="number"
            className="w-full p-2 rounded-md text-gray-900"
            id="product_price"
            aria-required
            {...register('product_price')}
          />
            {errors?.product_price &&(
              <small className="text-red-400">{errors.product_price.message}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_name">
            Product description
          </label>
          <textarea
            className="w-full p-2 rounded-md text-gray-900"
            id="product_description"
            aria-required
            {...register('product_description')}
          />
            {errors?.product_description &&(
              <small className="text-red-400">{errors.product_description.message}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_quantity">
            Product Quantity
          </label>
          <input
            type="number"
            className="w-full p-2 rounded-md text-gray-900"
            id="product_quantity"
            aria-required
            {...register('product_quantity')}
          />
            {errors?.product_quantity &&(
              <small className="text-red-400">{errors.product_quantity.message}</small>
            )}
        </div>
        <input
            type="hidden"
            className="w-full p-2 rounded-md text-gray-900"
            id="user_id"
            aria-required
            min={1}
            {...register('user_id')}
          />
        <button
          className="bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700"
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  </>
}