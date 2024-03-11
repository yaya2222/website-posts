import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  registr: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

export default function TextInputField({
  label,
  name,
  registr,
  error,
  registerOptions,
  ...props
}: TextInputFieldProps) {
  return (
    <div className="flex flex-col p-4 ">
      <label
        htmlFor={name}
        className={error ? "text-red-600" : "text-gray-600"}
      >
        {label}
      </label>
      <input
        id={name}
        {...registr(name, registerOptions)}
        {...props}
        className="p-2 border-gray-400 border rounded-md focus:outline-none focus:border-black"
      />
      <span className="text-red-600 text-sm px-2 mt-1">{error?.message}</span>
    </div>
  );
}
