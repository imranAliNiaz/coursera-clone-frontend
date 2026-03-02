import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  updateAdminUserRole,
} from "../../../redux/slices/admin/adminUsersSlice";
import type { AdminUserForm } from "../../../types/admin";
import type { UsersState } from "../../../types/ui/admin/users.types";

const useUsers = (): UsersState => {
  const dispatch = useAppDispatch();
  const {
    items: users,
    loading,
    error,
    deletingId,
  } = useAppSelector((state) => state.adminUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AdminUserForm>({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", password: "", role: "student" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAdminUser(formData)).unwrap();
      toast.success("User created successfully");
      handleCloseModal();
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        (typeof err === "string" ? err : undefined) ||
        "Failed to create user";
      toast.error(message);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await dispatch(updateAdminUserRole({ userId, role: newRole })).unwrap();
      toast.success(`Role updated to ${newRole}`);
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        (typeof err === "string" ? err : undefined) ||
        "Failed to update role";
      toast.error(message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await dispatch(deleteAdminUser(userId)).unwrap();
      toast.success("User deleted successfully");
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        (typeof err === "string" ? err : undefined) ||
        "Failed to delete user";
      toast.error(message);
    }
  };

  return {
    users,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    isDeleting: deletingId,
    formData,
    setFormData,
    fetchUsers: () => dispatch(fetchAdminUsers()),
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleSubmit,
    handleRoleChange,
    handleDeleteUser,
  };
};

export default useUsers;
