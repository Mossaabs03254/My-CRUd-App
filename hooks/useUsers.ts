import { useState, useEffect, useCallback } from "react";
import { User, ToastType } from "../types";
import { userService } from "../services/userService";

export const useUsers = (addToast: (msg: string, type: ToastType) => void) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.list();
      setUsers(data);
    } catch (err) {
      addToast("Error loading users", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (userData: Partial<User>) => {
    try {
      // JSONPlaceholder doesn't actually persist, so we simulate local update
      const newUser = await userService.create(userData);
      // Ensure we have a valid ID since JSONPlaceholder always returns 11
      const actualNewUser = {
        ...newUser,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      };
      setUsers((prev) => [actualNewUser, ...prev]);
      addToast("User created successfully", "success");
    } catch (err) {
      addToast("Failed to create user", "error");
    }
  };

  const editUser = async (id: number, userData: Partial<User>) => {
    try {
      await userService.update(id, userData);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...userData } : u)),
      );
      addToast("User updated successfully", "success");
    } catch (err) {
      addToast("Failed to update user", "error");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userService.remove(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      addToast("User deleted successfully", "success");
    } catch (err) {
      addToast("Failed to delete user", "error");
    }
  };

  return { users, loading, addUser, editUser, deleteUser, refresh: fetchUsers };
};
