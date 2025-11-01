"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // default role
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res: any = await register({ name, email, password, role }).unwrap();
      const { accessToken, user } = res.data ?? res;
      dispatch(setCredentials({ accessToken, user }));
      router.push("/"); // redirect after registration
    } catch (err: any) {
      setError(err?.data?.message || err?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Register</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <button
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
