import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Assuming `role` field determines if a user is an admin or not
}

const UserAccountPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUsers, setEditingUsers] = useState<Set<string>>(new Set());
  const [editedUsersData, setEditedUsersData] = useState<
    Map<string, Partial<User>>
  >(new Map());

  // Fetch all users (excluding admins)
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/all");
      // Filter out admins
      const filteredUsers = response.data.filter(
        (user: User) => user.role !== "admin"
      );
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Remove a user
  const removeUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setEditedUsersData((prev) => {
        const updated = new Map(prev);
        updated.delete(id);
        return updated;
      });
      setEditingUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    } catch (err) {
      console.error("Failed to remove user:", err);
    }
  };

  // Start editing for a specific user
  const handleEditClick = (user: User) => {
    setEditingUsers((prev) => new Set(prev).add(user.id));
    setEditedUsersData((prev) => {
      const updated = new Map(prev);
      updated.set(user.id, { ...user });
      return updated;
    });
  };

  // Handle input change for editing
  const handleInputChange = (id: string, field: keyof User, value: string) => {
    setEditedUsersData((prev) => {
      const updated = new Map(prev);
      const user = updated.get(id) || {};
      user[field] = value;
      updated.set(id, user);
      return updated;
    });
  };

  // Save all changes (update all edited users)
  const saveAllChanges = async () => {
    const updates = Array.from(editedUsersData.values());
    console.log("Saving updates:", updates);

    try {
      // Update each user individually
      await Promise.all(
        updates.map((userData) =>
          axios.put(`http://localhost:8080/api/users/${userData.id}`, userData)
        )
      );
      setUsers((prev) =>
        prev.map((user) => ({
          ...user,
          ...(editedUsersData.get(user.id) || {}),
        }))
      );
      setEditingUsers(new Set());
      setEditedUsersData(new Map());
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 via-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Manage User Accounts
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-blue-500 text-white font-semibold text-left">
                  User ID
                </th>
                <th className="px-4 py-3 bg-blue-500 text-white font-semibold text-left">
                  Username
                </th>
                <th className="px-4 py-3 bg-blue-500 text-white font-semibold text-left">
                  Email
                </th>
                <th className="px-4 py-3 bg-blue-500 text-white font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-all">
                  <td className="text-center px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">
                    {editingUsers.has(user.id) ? (
                      <input
                        type="text"
                        value={editedUsersData.get(user.id)?.name || ""}
                        onChange={(e) =>
                          handleInputChange(user.id, "name", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingUsers.has(user.id) ? (
                      <input
                        type="email"
                        value={editedUsersData.get(user.id)?.email || ""}
                        onChange={(e) =>
                          handleInputChange(user.id, "email", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="flex justify-center items-center space-x-2 px-4 py-3">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeUser(user.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editedUsersData.size > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={saveAllChanges}
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-all"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountPage;
