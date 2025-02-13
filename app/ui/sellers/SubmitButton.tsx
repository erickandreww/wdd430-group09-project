'use client'

import { useFormStatus } from "react-dom"

export default function SubmitButton(){
    const {pending} = useFormStatus();
    return(
        <button className="bg-slate-100 py-2 px-4 rounded-md w-full hover:bg-slate-200">{pending? 'Submiting....': 'Submit'}</button>
    )
}