"use client";

import LoginForm from "@/components/loginform";
import { useAuth } from "@/context/authcontext";
import { Login as LoginInterface } from "@/interface/logininterface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const [form, setForm] = useState<LoginInterface>({email:"", password:""});
    const {loginUser, isLoading} = useAuth();
    const router = useRouter();

    const handleOnChange = (key: string, value: string)=>{
        setForm({...form, [key]: value});
    }
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await loginUser(form);
        if(response.success && response.data){
            router.push("/");
        }else{
            alert(response.error || "Internal Server Error");
        }
        console.log("response from login page!", response);
    }
    
    return(
        <div className="min-h-screen gap-4 py-24 bg-base-300">
            <LoginForm 
            onChange={handleOnChange} 
            form={form} 
            onSubmit={handleOnSubmit} 
            isLoading={isLoading}/>
        </div>
    )
}