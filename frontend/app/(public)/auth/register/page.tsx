"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";

export default function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(
        setCredentials({ accessToken: res.accessToken, user: res.user })
      );
      router.push("/"); // redirect home
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <select {...register("role")} className="border p-2 w-full">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
