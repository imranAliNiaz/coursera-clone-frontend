import type { InstructorCourseForm, InstructorSummary } from "../../instructor";

export interface CreateCourseState {
  id: string | undefined;
  isEditMode: boolean;
  isAdmin: boolean;
  form: InstructorCourseForm;
  setForm: React.Dispatch<React.SetStateAction<InstructorCourseForm>>;
  thumbnailFile: File | null;
  setThumbnailFile: React.Dispatch<React.SetStateAction<File | null>>;
  thumbnailPreview: string | null;
  loading: boolean;
  fetching: boolean;
  instructors: InstructorSummary[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  handleManageVideos: () => void;
}
