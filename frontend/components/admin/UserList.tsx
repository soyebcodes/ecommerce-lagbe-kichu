"use client";

import { useGetAllUsersQuery, useBanUserMutation } from "@/store/adminApi";

export default function UserList() {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [banUser] = useBanUserMutation();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Role</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user._id}>
              <td className="border px-2">{user.name}</td>
              <td className="border px-2">{user.email}</td>
              <td className="border px-2">{user.role}</td>
              <td className="border px-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => banUser(user._id)}
                >
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
