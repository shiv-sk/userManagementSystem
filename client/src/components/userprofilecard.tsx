"use client";

import BaseButton from "./basebutton";
import BaseInput from "./baseinput";
import React from "react";
import { Userdata } from "@/interface/userdatainterface";

export default function UserProfile(
    {user}:
    {
        user: Userdata | null
    }){
    return(
        <div className="bg-base-100 flex justify-center items-center max-w-sm w-full p-6 rounded-lg shadow-lg mx-auto flex-col">
            <h1 className="text-center font-bold text-2xl underline">User Profile</h1>
            <div>
                <form className="gap-2.5 py-6 space-y-3 w-full">
                    <BaseInput 
                    label="Id" 
                    type="text"
                    readOnly={true} 
                    value={user?._id ?? "UserId"}
                    required={true}
                    disabled={true} />

                    <BaseInput 
                    label="Username" 
                    type="text"
                    value={user?.name ?? "UserName"}
                    required={true}
                    readOnly={true}
                    disabled={true} />
                    
                    <BaseInput 
                    label="Email" 
                    type="text"
                    readOnly={true} 
                    value={user?.email ?? "UserEmail"}
                    required={true}
                    disabled={true} />

                    <BaseInput
                    readOnly={true}
                    label="role" 
                    type="text"  
                    value={user?.role ?? "UserRole"}
                    required={true}
                    disabled={true} />

                    {/* <Redirect url={"/login"} name={"Login"} text={"Already Have An Account"} /> */}
                    <BaseButton 
                    type="button"
                    text="Request change role"
                    className="btn btn-primary py-2.5 px-2 w-full"/>
                </form>
            </div>
        </div>
    )
}