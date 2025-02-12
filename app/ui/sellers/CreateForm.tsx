'use client';

import { formHandlerAction } from "@/app/_actions/formHandler";
import { StringMap } from "@/app/lib/product";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page({userId}: {userId: string}) {
    const [errors, setErrors] = useState<StringMap>({});


    const handleFormSubmit = async(formData: FormData) =>{
        const{errors, successMsg} = await formHandlerAction(formData);
        if(successMsg){
            toast.success('Product added!')
            redirect('/sellers')
        }
        setErrors(errors || {});
        console.log(errors, successMsg);
    }
  return <>
      <form action={handleFormSubmit}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="product_name">
            Product Name
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-md text-gray-900"
            name="product_name"
            id="product_name"
            required
          />
            {errors?.product_name && (
              <small className="text-red-400">{errors.product_name}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_image">
            Product Image URL
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-md text-gray-900"
            name="product_image"
            id="product_image"
            required
          />
            {errors?.product_image && (
              <small className="text-red-400">{errors.product_image}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_price">
            Product Price
          </label>
          <input
            type="number"
            name="product_price"
            className="w-full p-2 rounded-md text-gray-900"
            id="product_price"
            required
            min={1}
          />
            {errors?.product_price && (
              <small className="text-red-400">{errors.product_price}</small>
            )}
        </div>
        <div>
          <label className="block " htmlFor="product_quantity">
            Product Quantity
          </label>
          <input
            type="number"
            className="w-full p-2 rounded-md text-gray-900"
            name="product_quantity"
            id="product_quantity"
            required
            min={1}
            max={20}
          />
            {errors?.product_quantity && (
              <small className="text-red-400">{errors.product_quantity}</small>
            )}
        </div>
        <input
            type="hidden"
            name="id"
            className="w-full p-2 rounded-md text-gray-900"
            id="id"
            required
            min={1}
            defaultValue={userId}
          />
        <button
          className="bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700"
          type="submit"
        >
            Submit
        </button>
      </div>
    </form>
  </>
}