import axios, { isAxiosError } from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const getToken = ()=>{
    if(typeof window === "undefined") return;
    return sessionStorage.getItem("access_token") ?? "";
}
const token = getToken();
const getAndDeleteReq = async(url: string , method: "GET" | "DELETE")=>{
    // console.log("baseurl from getanddelete req:" , baseUrl);
    try {
        const response = await axios({
            url,
            method,
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            withCredentials:true,
        })
        // console.log("response from getAndDeleteReq! " , response?.data);
        return response?.data;
    } catch (error: unknown){
        if(isAxiosError(error)){
            console.log("error from getAndDeleteReq! " , error.response?.data.message);
        }
        throw error;
    }
}

const postAndPatchReq = async(url: string , method: "POST" | "PATCH" , data: object | FormData , isFormData=false)=>{
    try {
        const response = await axios({
            url,
            method,
            data,
            headers:{
                "Content-Type":isFormData ? "multipart/form-data" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            withCredentials:true
        })
        // console.log("response from postAndPatchReq! " , response?.data);
        return response?.data;
    } catch (error: unknown) {
        if(isAxiosError(error)){
            console.log("error from getAndDeleteReq! " , error.response?.data.message);
        }
        throw error;
    }
}

export {getAndDeleteReq , postAndPatchReq, baseUrl};