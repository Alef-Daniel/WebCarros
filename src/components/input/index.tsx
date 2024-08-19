import { RegisterOptions, UseFormRegister } from "react-hook-form";



interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;

}



export default function Input({ type, name, placeholder, register, error, rules }: InputProps) {
    return (
        <div>
            <input
                className="w-full border-2 rounded-md h-11 px-2"
                {...register(name, rules)}
                id={name}
                type={type}
                placeholder={placeholder} />
            {error && <p className="my-1 text-red-500">{error}</p>}
        </div>
    );
}