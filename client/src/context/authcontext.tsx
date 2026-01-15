/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseUrl, getAndDeleteReq, postAndPatchReq } from "@/apicalls/apicalls";
import { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface User{
    id:string,
    name:string,
    role:string,
    email:string,
}

interface RegisterData{
    name:string,
    email:string,
    password:string,
}

interface LoginData{
    email:string,
    password:string,
}

interface AuthResponse{
    success:boolean,
    data?:User,
    error?:string
}

interface AuthContextType{
    user:User | null,
    isLoading:boolean,
    logoutUser:()=>Promise<AuthResponse>,
    registerUser:(data:RegisterData)=>Promise<AuthResponse>,
    loginUser:(data:LoginData)=>Promise<AuthResponse>,
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    registerUser: async () => ({ success: false, error: "Not implemented" }),
    loginUser: async () => ({ success: false, error: "Not implemented" }),
    logoutUser: async () => ({ success: false, error: "Not implemented" }),
});

const useAuth = ()=>useContext(AuthContext);


const AuthProvider = ({ children }: { children: ReactNode })=>{
    const [user , setUser] = useState<User | null>(null);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        const currentUser = async():Promise<AuthResponse>=>{
            // console.log("baseurl is!" , baseUrl);
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`${baseUrl}/auth/me` , "GET");
                if(response){
                    // console.log(response);
                    setUser(response);
                }
                // console.log("user from current user function! " , user);
                return { success: true, data: response?.user }; 
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Unable to find current user.";
                return { success:false , error:errorMessage }
            }finally{
                setIsLoading(false);
            }
        }
        currentUser();
    } , []);

    const logoutUser = async():Promise<AuthResponse>=>{
        setIsLoading(true);
        try {
            const response = await getAndDeleteReq(`${baseUrl}/auth/logout` , "GET");
            // console.log(response);
            setUser(null);
            sessionStorage.clear();
            return { success: true, data: response };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Unable to logout user.";
            throw { success:false , error:errorMessage }
        }finally{
            setIsLoading(false);
        }
    };

    const loginUser = async(data:LoginData):Promise<AuthResponse>=>{
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`${baseUrl}/auth/login` , "POST" , data);
            // console.log(response);
            setUser(response?.user);
            sessionStorage.setItem("access_token", response?.access_token || "");
            return { success: true, data: response?.user };
        } catch (error: unknown) {
            let errorMessage;
            if(isAxiosError(error)){
                errorMessage = error?.response?.data?.messgae || "Unable to find user.";
            }
            return { success:false , error:errorMessage }
        }finally{
            setIsLoading(false);
        }
    };

    const registerUser = async(data:RegisterData):Promise<AuthResponse>=>{
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`${baseUrl}/auth/register` , "POST" , data);
            // console.log(response);
            return { success: true, data: response };
        } catch (error: unknown) {
            let errorMessage;
            if(isAxiosError(error)){
                errorMessage = error.response?.data?.message || "Unable to register user.";
            }
            return { success:false , error:errorMessage }
        }finally{
            setIsLoading(false);
        }
    };

    return(
        <AuthContext.Provider value={{isLoading , registerUser , loginUser , logoutUser , user}}>
            {children}
        </AuthContext.Provider>
    )
}

export {useAuth , AuthProvider}