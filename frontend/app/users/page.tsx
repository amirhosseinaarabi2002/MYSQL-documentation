"use client";

import { deleteUser, getAllUsers, updateUser, User } from "@/api/user_api";
import React, { useEffect, useState } from "react";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete Modal
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Edit Modal
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("❌ Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setProcessing(true);
    try {
      await deleteUser(deleteId);
      setUsers(users.filter((u) => u.id !== deleteId));
      setMessage(`✅ User #${deleteId} deleted successfully`);
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Failed to delete user");
    } finally {
      setDeleteId(null);
      setProcessing(false);
    }
  };

  const handleEdit = async () => {
    if (!editUser) return;
    setProcessing(true);
    try {
      await updateUser(editUser.id, editForm);
      setUsers(
        users.map((u) =>
          u.id === editUser.id ? { ...u, ...editForm } : u
        )
      );
      setMessage(`✅ User ${editForm.username} updated successfully`);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update user");
    } finally {
      setEditUser(null);
      setProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      {message && (
        <div
          className={`mb-4 rounded-lg p-3 text-sm ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Username</th>
                <th className="p-3">Password</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className={`${
                    i % 2 === 0
                      ? "bg-gray-50 dark:bg-neutral-900"
                      : "bg-white dark:bg-neutral-950"
                  } hover:bg-gray-100 dark:hover:bg-neutral-800`}
                >
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.firstname}</td>
                  <td className="p-3">{u.lastname}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.password}</td>
                  <td className="p-3">{u.date}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditUser(u);
                        setEditForm({
                          firstname: u.firstname,
                          lastname: u.lastname,
                          username: u.username,
                          password: u.password,
                        });
                      }}
                      className="rounded-lg bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(u.id)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete user #{deleteId}?
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={processing}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {processing ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              <input
                type="text"
                value={editForm.firstname}
                onChange={(e) =>
                  setEditForm({ ...editForm, firstname: e.target.value })
                }
                className="mb-3 w-full rounded-lg border p-2 dark:bg-neutral-800 dark:border-neutral-700"
                placeholder="First Name"
              />
              <input
                type="text"
                value={editForm.lastname}
                onChange={(e) =>
                  setEditForm({ ...editForm, lastname: e.target.value })
                }
                className="mb-3 w-full rounded-lg border p-2 dark:bg-neutral-800 dark:border-neutral-700"
                placeholder="Last Name"
              />
              <input
                type="text"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                className="mb-3 w-full rounded-lg border p-2 dark:bg-neutral-800 dark:border-neutral-700"
                placeholder="Username"
              />
              <input
                type="password"
                value={editForm.password}
                onChange={(e) =>
                  setEditForm({ ...editForm, password: e.target.value })
                }
                className="mb-3 w-full rounded-lg border p-2 dark:bg-neutral-800 dark:border-neutral-700"
                placeholder="Password"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
