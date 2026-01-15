import { Loadingstate } from "./loadingstate";

type BaseButtonProps = {
    type: "button" | "submit" | "reset";
    text: string | undefined;
    className?: string;
    handleOnClick?: ()=>void;
    isLoading?: boolean,
    disabled?: boolean,
}
export default function BaseButton(
    {type, text, className, handleOnClick, isLoading, disabled}: BaseButtonProps){
    return(
        <button 
        className={`text-lg ${className}`}
        type={type}
        disabled={disabled}
        onClick={handleOnClick}>{
            isLoading ? <Loadingstate className="loading-xs"/> : text
        }
        </button>
    )
}