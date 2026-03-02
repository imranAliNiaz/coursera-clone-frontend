import type { AdminUser, AdminUserForm } from "../../admin";

export interface UsersState {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isDeleting: string | null;
  formData: AdminUserForm;
  setFormData: React.Dispatch<React.SetStateAction<AdminUserForm>>;
  fetchUsers: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleRoleChange: (userId: string, newRole: string) => Promise<void>;
  handleDeleteUser: (userId: string) => Promise<void>;
}
