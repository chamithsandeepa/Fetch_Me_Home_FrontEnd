import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import "./UserAccounts.css";

interface User {
  id: string;
  name: string;
  email: string;
}

const UserAccountPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUsers, setEditingUsers] = useState<Set<string>>(new Set());
  const [editedUsersData, setEditedUsersData] = useState<
    Map<string, Partial<User>>
  >(new Map());

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/all");
      setUsers(response.data);
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
    <div className="user-page">
      <div className="user-container">
        <h1 className="user-title">Manage User Accounts</h1>
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="center">{user.id}</td>
                  <td>
                    {editingUsers.has(user.id) ? (
                      <input
                        type="text"
                        value={editedUsersData.get(user.id)?.name || ""}
                        onChange={(e) =>
                          handleInputChange(user.id, "name", e.target.value)
                        }
                        className="user-input"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editingUsers.has(user.id) ? (
                      <input
                        type="email"
                        value={editedUsersData.get(user.id)?.email || ""}
                        onChange={(e) =>
                          handleInputChange(user.id, "email", e.target.value)
                        }
                        className="user-input"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="user-action-cell">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="user-btn edit-btn"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeUser(user.id)}
                      className="user-btn delete-btn"
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
          <div className="user-save-container">
            <button onClick={saveAllChanges} className="user-btn save-btn">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountPage;
