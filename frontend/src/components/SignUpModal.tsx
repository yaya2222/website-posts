import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/users_api";
import { IoMdClose } from "react-icons/io";
import TextInputField from "./form/TextInputField";

interface SignUpModalPorps {
  close?: () => void;
  onSignSuccesful?: (user: User) => void;
}

export default function SignUpModal({
  close,
  onSignSuccesful,
}: SignUpModalPorps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = () => {};

  return (
    <div
      // onClick={closeDialog}
      id="dialogUsers"
      className="fixed inset-0 z-10 bg-black backdrop-blur-md bg-opacity-50 transition-opacity "
    >
      <div className="bg-white max-w-lg m-auto mt-20 rounded-lg">
        <h1 className="text-3xl font-semibold px-4 py-3 border-gray-500 border-b flex justify-between items-center">
          <span>Sign Up</span>
          <IoMdClose
            // onClick={() => close()}
            className="cursor-pointer text-gray-500"
          />
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <TextInputField
            label="Username"
            name="usernane"
            registr={register}
            placeholder="Username"
            type="text"
            error={errors.username}
            registerOptions={{ required: { value: true, message: "Required" } }}
          />
          <TextInputField
            label="Email"
            name="email"
            registr={register}
            placeholder="Email"
            type="email"
            error={errors.email}
            registerOptions={{ required: { value: true, message: "Required" } }}
          />
          <TextInputField
            label="Password"
            name="password"
            registr={register}
            placeholder="password"
            type="password"
            error={errors.password}
            registerOptions={{ required: { value: true, message: "Required" } }}
          />
             <div className="border-t border-gray-500 py-3 px-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
