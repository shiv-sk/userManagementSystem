"use client";
import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { Userdata } from "@/interface/userdatainterface";
import { useEffect, useState } from "react";

export function useAllUser (){
    const [allUsers, setAllUsers] = useState<Userdata[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(()=>{
        const getAllJobs = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/user/`, "GET");
                // console.log("response from alljobs", response);
                setAllUsers(response);
            } catch (error) {
                console.log("error from allUsers page!", error);
                setError(error)
            }finally{
                setIsLoading(false);
            }
        }
        getAllJobs();
    }, []);

    return {allUsers, isLoading, error}
}

export function useUserProfile (){
    const [user, setUser] = useState<Userdata | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(()=>{
        const getAllJobs = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/user/`, "GET");
                // console.log("response from alljobs", response);
                setUser(response);
            } catch (error) {
                console.log("error from allUsers page!", error);
                setError(error)
            }finally{
                setIsLoading(false);
            }
        }
        getAllJobs();
    }, []);

    return {user, isLoading, error}
}