"use client";
import { Register } from "@/interface/registerinterface";
import BaseButton from "./basebutton";
import BaseInput from "./baseinput";
import React from "react";

export default function RegisterForm(
    {onChange, form, onSubmit, isLoading}: 
    {
        onChange: (key: string, value: string)=>void, 
        form: Register, 
        onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void,
        isLoading: boolean
    }){
    return(
        <div className="bg-base-100 flex justify-center items-center max-w-sm w-full p-6 rounded-lg shadow-lg mx-auto flex-col">
            <h1 className="text-center font-bold text-2xl underline">Register</h1>
            <div>
                <form className="gap-2.5 py-6 space-y-3 w-full" onSubmit={onSubmit}>
                    <BaseInput 
                    label="Username" 
                    type="text" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange("name", e.target.value)} 
                    value={form.name} 
                    placeholder="John Doe"
                    required={true} />
                    
                    <BaseInput 
                    label="Email" 
                    type="text" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("email", e.target.value)} 
                    value={form.email} 
                    placeholder="exp123@email.com"
                    required={true} />

                    <BaseInput 
                    label="Password" 
                    type="password" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("password", e.target.value)} 
                    value={form.password} 
                    placeholder="Pass@123"
                    required={true} />

                    {/* <Redirect url={"/login"} name={"Login"} text={"Already Have An Account"} /> */}
                    <BaseButton 
                    type="submit" 
                    text="Register"
                    isLoading={isLoading} 
                    className="btn btn-primary py-2.5 px-2 w-full"/>
                </form>
            </div>
        </div>
    )
}