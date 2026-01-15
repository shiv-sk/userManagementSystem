"use client";
import RegisterForm from "@/components/registerform";
import { useAuth } from "@/context/authcontext";
import { Register as RegisterInterface } from "@/interface/registerinterface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
    const router = useRouter();
    const {registerUser, isLoading} = useAuth();
    const [form, setForm] = useState<RegisterInterface>({email:"", password:"", name:""});

    const handleOnChange = (key: string, value: string)=>{
        setForm({...form, [key]: value});
    }
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await registerUser(form);
        // console.log("response from register page!", response);
        if(response.success && response.data){
            router.push("/login");
        }else{
            alert(response.error || "Internal Server Error");
        }
    }
    return(
        <div className="min-h-screen gap-4 py-28 bg-base-300">
            <RegisterForm 
            onChange={handleOnChange} 
            form={form} 
            onSubmit={handleOnSubmit}
            isLoading={isLoading} />
        </div>
    )
}