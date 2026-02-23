import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { courseApi } from "../../../services/courseApi";
import adminApi from "../../../services/adminApiClient";
import { toast } from "react-hot-toast";
import type {
  CourseStatus,
  CourseDifficulty,
  InstructorCourseForm,
  InstructorSummary,
} from "../../../types/instructor";
import type { CreateCourseState } from "../../../types/ui/instructor/create-course.types";

const normalizeDifficulty = (value: unknown): CourseDifficulty => {
  if (
    value === "Beginner" ||
    value === "Intermediate" ||
    value === "Advanced"
  ) {
    return value;
  }
  return "Beginner";
};

const normalizeStatus = (value: unknown): CourseStatus => {
  if (value === "Draft" || value === "Published") {
    return value;
  }
  return "Draft";
};

const useCreateCourse = (): CreateCourseState => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState<InstructorCourseForm>({
    title: "",
    subtitle: "",
    category: "Development",
    difficulty: "Beginner",
    language: "English",
    price: "0",
    status: "Draft",
    description: "",
    outcomes: "",
    skills: "",
    durationMinutes: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [instructors, setInstructors] = useState<InstructorSummary[]>([]);
  const isAdmin = location.pathname.includes("/admin");

  useEffect(() => {
    if (isEditMode && id) {
      const fetchCourse = async () => {
        try {
          const data = await courseApi.getCourseById(id);
          setForm({
            title: data.title || "",
            subtitle: data.subtitle || "",
            category: data.category || "Development",
            difficulty: normalizeDifficulty(data.difficulty),
            language: data.language || "English",
            price: String(data.price ?? 0),
            status: normalizeStatus(data.status),
            description: data.description || "",
            outcomes: data.outcomes || "",
            skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
            durationMinutes:
              data.durationMinutes !== undefined &&
              data.durationMinutes !== null
                ? String(data.durationMinutes)
                : "",
          });
          setThumbnailFile(null);
          setThumbnailPreview(data.thumbnail || null);
        } catch (error) {
          toast.error("Failed to fetch course details");
        } finally {
          setFetching(false);
        }
      };
      fetchCourse();
    }
  }, [id, isEditMode]);

  useEffect(() => {
    if (isAdmin && !isEditMode) {
      const fetchInstructors = async () => {
        try {
          const response = await adminApi.get("/users?role=instructor");
          const users = Array.isArray(response.data?.users)
            ? (response.data.users as InstructorSummary[])
            : [];
          setInstructors(users);
        } catch (error) {
          toast.error("Failed to load instructors");
        }
      };
      fetchInstructors();
    }
  }, [isAdmin, isEditMode]);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value as any }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        durationMinutes:
          form.durationMinutes.trim() === ""
            ? undefined
            : parseInt(form.durationMinutes, 10),
        ...(isAdmin && !isEditMode && { instructorId: form.instructorId }),
      };

      if (isEditMode && id) {
        if (isAdmin) {
          await courseApi.updateCourseAsAdmin(id, payload);
          if (thumbnailFile) {
            await courseApi.uploadCourseThumbnailAsAdmin(id, thumbnailFile);
          }
        } else {
          await courseApi.updateCourse(id, payload);
          if (thumbnailFile) {
            await courseApi.uploadCourseThumbnail(id, thumbnailFile);
          }
        }
        toast.success("Course updated successfully");
      } else {
        const newCourse = isAdmin
          ? await courseApi.createCourseAsAdmin(payload)
          : await courseApi.createCourse(payload);
        if (thumbnailFile && newCourse?.id) {
          if (isAdmin) {
            await courseApi.uploadCourseThumbnailAsAdmin(
              newCourse.id,
              thumbnailFile,
            );
          } else {
            await courseApi.uploadCourseThumbnail(newCourse.id, thumbnailFile);
          }
        }
        toast.success("Course created successfully");
        navigate(isAdmin ? `/admin/courses` : `/instructor/courses`);
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!thumbnailFile) return;
    const objectUrl = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile]);

  const handleManageVideos = () => {
    if (!id) return;
    navigate(
      location.pathname.includes("/admin")
        ? `/admin/videos?courseId=${id}`
        : `/instructor/videos?courseId=${id}`,
    );
  };

  return {
    id,
    isEditMode,
    isAdmin,
    form,
    setForm,
    thumbnailFile,
    setThumbnailFile,
    thumbnailPreview,
    loading,
    fetching,
    instructors,
    onChange,
    onSubmit,
    handleManageVideos,
  };
};

export default useCreateCourse;
