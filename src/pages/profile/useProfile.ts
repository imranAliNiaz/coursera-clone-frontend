import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import type {
  WorkExperience,
  WorkExperienceInput,
  Education,
  EducationInput,
  ProfileCertificate,
  ProfileCertificateInput,
} from "../../types/student";
import type { CredentialModalType } from "../../types/ui/profile.types";
import {
  fetchProfileData,
  saveWorkExperience,
  deleteWorkExperience,
  saveEducation,
  deleteEducation,
  saveProfileCertificate,
  deleteProfileCertificate,
} from "../../redux/slices/student/studentProfileSlice";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const displayName = user?.name || "Learner";
  const displayInitials = user?.name ? getInitials(user.name) : "L";
  const avatarBg = user?.name ? getAvatarColor(user.name) : "#A64AC9";
  const {
    workExperiences,
    educations,
    profileCertificates,
    completedCourses,
    isLoadingWork,
    isLoadingCredentials,
    isLoadingCompletedCourses,
    isSavingWork,
    isSavingCredential,
    isDeletingWorkId,
    isDeletingCredentialId,
  } = useAppSelector((state) => state.studentProfile);

  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [credentialModalType, setCredentialModalType] =
    useState<CredentialModalType>("selector");
  const [editingEducationId, setEditingEducationId] = useState<string | null>(
    null,
  );
  const [editingProfileCertificateId, setEditingProfileCertificateId] =
    useState<string | null>(null);
  const [educationForm, setEducationForm] = useState<EducationInput>({
    instituteName: "",
    degreeDetails: "",
    startDate: "",
    endDate: "",
  });
  const [certificateForm, setCertificateForm] =
    useState<ProfileCertificateInput>({
      certificateName: "",
      completionDate: "",
    });
  const [workForm, setWorkForm] = useState<WorkExperienceInput>({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const isWorkFormValid = useMemo(
    () =>
      Boolean(
        workForm.title.trim() &&
        workForm.company.trim() &&
        workForm.startDate.trim(),
      ),
    [workForm.company, workForm.startDate, workForm.title],
  );

  const isEducationFormValid = useMemo(
    () =>
      Boolean(
        educationForm.instituteName.trim() &&
        educationForm.degreeDetails.trim() &&
        educationForm.startDate.trim() &&
        educationForm.endDate.trim(),
      ),
    [
      educationForm.degreeDetails,
      educationForm.endDate,
      educationForm.instituteName,
      educationForm.startDate,
    ],
  );

  const isCertificateFormValid = useMemo(
    () =>
      Boolean(
        certificateForm.certificateName.trim() &&
        certificateForm.completionDate.trim(),
      ),
    [certificateForm.certificateName, certificateForm.completionDate],
  );

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const resetWorkForm = () => {
    setEditingWorkId(null);
    setWorkForm({
      title: "",
      company: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  const openAddWorkModal = () => {
    resetWorkForm();
    setIsWorkModalOpen(true);
  };

  const openEditWorkModal = (item: WorkExperience) => {
    setEditingWorkId(item.id);
    setWorkForm({
      title: item.title || "",
      company: item.company || "",
      location: item.location || "",
      employmentType: item.employmentType || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      isCurrent: Boolean(item.isCurrent),
      description: item.description || "",
    });
    setIsWorkModalOpen(true);
  };

  const handleSaveWorkExperience = async () => {
    if (!isWorkFormValid) return;
    try {
      const payload: WorkExperienceInput = {
        title: workForm.title.trim(),
        company: workForm.company.trim(),
        location: workForm.location?.trim() || "",
        employmentType: workForm.employmentType?.trim() || "",
        startDate: workForm.startDate,
        endDate: workForm.isCurrent ? "" : workForm.endDate || "",
        isCurrent: Boolean(workForm.isCurrent),
        description: workForm.description?.trim() || "",
      };
      await dispatch(
        saveWorkExperience({ id: editingWorkId || undefined, data: payload }),
      ).unwrap();
      toast.success(
        editingWorkId ? "Work experience updated" : "Work experience added",
      );
      setIsWorkModalOpen(false);
      resetWorkForm();
    } catch (error) {
      toast.error("Failed to save work experience");
    }
  };

  const handleDeleteWorkExperience = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this work experience?",
    );
    if (!ok) return;
    try {
      await dispatch(deleteWorkExperience(id)).unwrap();
      toast.success("Work experience deleted");
    } catch (error) {
      toast.error("Failed to delete work experience");
    }
  };

  const formatMonthYear = (value?: string) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    const monthNumber = Number(month);
    if (!year || !month || Number.isNaN(monthNumber)) return value;
    const date = new Date(Number(year), monthNumber - 1, 1);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatCompletionDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const resetEducationForm = () => {
    setEditingEducationId(null);
    setEducationForm({
      instituteName: "",
      degreeDetails: "",
      startDate: "",
      endDate: "",
    });
  };

  const resetCertificateForm = () => {
    setEditingProfileCertificateId(null);
    setCertificateForm({
      certificateName: "",
      completionDate: "",
    });
  };

  const closeCredentialModal = () => {
    setIsCredentialModalOpen(false);
    setCredentialModalType("selector");
    resetEducationForm();
    resetCertificateForm();
  };

  const openCredentialSelectionModal = () => {
    setCredentialModalType("selector");
    resetEducationForm();
    resetCertificateForm();
    setIsCredentialModalOpen(true);
  };

  const openAddEducationModal = () => {
    resetEducationForm();
    setCredentialModalType("education");
    setIsCredentialModalOpen(true);
  };

  const openEditEducationModal = (item: Education) => {
    setEditingEducationId(item.id);
    setEducationForm({
      instituteName: item.instituteName || "",
      degreeDetails: item.degreeDetails || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
    });
    setCredentialModalType("education");
    setIsCredentialModalOpen(true);
  };

  const openAddCertificateModal = () => {
    resetCertificateForm();
    setCredentialModalType("certificate");
    setIsCredentialModalOpen(true);
  };

  const openEditCertificateModal = (item: ProfileCertificate) => {
    setEditingProfileCertificateId(item.id);
    setCertificateForm({
      certificateName: item.certificateName || "",
      completionDate: item.completionDate || "",
    });
    setCredentialModalType("certificate");
    setIsCredentialModalOpen(true);
  };

  const handleSaveEducation = async () => {
    if (!isEducationFormValid) return;
    try {
      const payload: EducationInput = {
        instituteName: educationForm.instituteName.trim(),
        degreeDetails: educationForm.degreeDetails.trim(),
        startDate: educationForm.startDate,
        endDate: educationForm.endDate,
      };
      await dispatch(
        saveEducation({ id: editingEducationId || undefined, data: payload }),
      ).unwrap();
      toast.success(
        editingEducationId ? "Education updated" : "Education added",
      );
      closeCredentialModal();
    } catch (error) {
      toast.error("Failed to save education");
    }
  };

  const handleSaveCertificate = async () => {
    if (!isCertificateFormValid) return;
    try {
      const payload: ProfileCertificateInput = {
        certificateName: certificateForm.certificateName.trim(),
        completionDate: certificateForm.completionDate,
      };
      await dispatch(
        saveProfileCertificate({
          id: editingProfileCertificateId || undefined,
          data: payload,
        }),
      ).unwrap();
      toast.success(
        editingProfileCertificateId
          ? "Certificate updated"
          : "Certificate added",
      );
      closeCredentialModal();
    } catch (error) {
      toast.error("Failed to save certificate");
    }
  };

  const handleDeleteEducation = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this education?",
    );
    if (!ok) return;
    try {
      await dispatch(deleteEducation(id)).unwrap();
      toast.success("Education deleted");
    } catch (error) {
      toast.error("Failed to delete education");
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this certificate?",
    );
    if (!ok) return;
    try {
      await dispatch(deleteProfileCertificate(id)).unwrap();
      toast.success("Certificate deleted");
    } catch (error) {
      toast.error("Failed to delete certificate");
    }
  };

  return {
    user,
    displayName,
    displayInitials,
    avatarBg,
    workExperiences,
    isWorkModalOpen,
    setIsWorkModalOpen,
    editingWorkId,
    isLoadingWork,
    isSavingWork,
    isDeletingWorkId,
    educations,
    profileCertificates,
    completedCourses,
    isCredentialModalOpen,
    setIsCredentialModalOpen,
    credentialModalType,
    setCredentialModalType,
    editingEducationId,
    editingProfileCertificateId,
    isLoadingCredentials,
    isLoadingCompletedCourses,
    isSavingCredential,
    isDeletingCredentialId,
    educationForm,
    setEducationForm,
    certificateForm,
    setCertificateForm,
    workForm,
    setWorkForm,
    isWorkFormValid,
    isEducationFormValid,
    isCertificateFormValid,
    resetWorkForm,
    openAddWorkModal,
    openEditWorkModal,
    handleSaveWorkExperience,
    handleDeleteWorkExperience,
    formatMonthYear,
    formatCompletionDate,
    resetEducationForm,
    resetCertificateForm,
    closeCredentialModal,
    openCredentialSelectionModal,
    openAddEducationModal,
    openEditEducationModal,
    openAddCertificateModal,
    openEditCertificateModal,
    handleSaveEducation,
    handleSaveCertificate,
    handleDeleteEducation,
    handleDeleteCertificate,
  };
};

export default useProfile;
