'use client';

import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, productEditSchema } from "@/app/_schemas/productEdit";
import { formHandlerActionEdit } from "@/app/_actions/formHandlerEdit";

interface ProductData{
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
  product_quantity: number;
  product_id: string;
}

export default function Page({productData}:{productData:ProductData | undefined}) {
    const {register, handleSubmit, formState:{errors, isSubmitting}}= useForm<Product>({
        resolver: zodResolver(productEditSchema),
        defaultValues:{
            product_name: `${productData?.product_name}`,
            product_image: `${productData?.product_image}`,
            product_price: Number(productData?.product_price),
            product_description: `${productData?.product_description}`,
            product_quantity: Number(productData?.product_quantity),
            product_id: `${productData?.product_id}`
        },
        mode: 'onChange'
    })

    const onSubmit = async (product: Product)=>{
        const {successMsg} = await formHandlerActionEdit(product);
        if(successMsg){
            toast.success(successMsg);
            redirect("/sellers")
        }
    }
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
            id="product_id"
            aria-required
            min={1}
            {...register('product_id')}
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