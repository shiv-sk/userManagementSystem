"use client";
export default function BaseInput(
    {label, type, onChange, value, placeholder, required=false, readOnly=false, disabled=false, className}:
    {
        label?: string, 
        type :string, 
        onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void, 
        value: string | number, 
        placeholder?: string, 
        required?: boolean, 
        className?: string,
        readOnly?: boolean,
        disabled?: boolean,
    }){
    return(
        <div className="form-control w-full">
            {
                label && (
                    <label htmlFor="" className="label font-bold text-lg">{label}</label>
                )
            }
            <input 
            type={type} 
            placeholder={placeholder} 
            className={`input w-full ${className}`} 
            value={value} 
            onChange={onChange}
            required={required}
            readOnly={readOnly}
            disabled={disabled} />
        </div> 
    )
}