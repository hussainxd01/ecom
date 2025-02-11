import React from "react";
import { format } from "date-fns";
import { CheckCircle, UserRoundSearch, XCircle } from "lucide-react";

import { useShop } from "../context/ShopContext";

export default function UserList() {
  const { users } = useShop();
  console.log(users);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">User List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Role</th>
              <th className="text-left p-3 font-medium">Verified</th>
              <th className="text-left p-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  {user.emailVerified ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </td>
                <td className="p-3">
                  {format(new Date(user.createdAt), "MMM d, yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
