"use client";

import { useGetAllUsersQuery } from "@/store/adminApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function UserList() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const {
    data: users,
    isLoading,
    isError,
  } = useGetAllUsersQuery(undefined, {
    skip: !accessToken,
  });

  const userList = users || [];

  if (!accessToken) return <p>Loading auth...</p>;
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <ul className="space-y-1">
        {userList?.map((user: any) => (
          <li key={user._id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
