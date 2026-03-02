import type { AdminInstructor } from "../../admin";

export interface InstructorsState {
  instructors: AdminInstructor[];
  loading: boolean;
  error: string | null;
  fetchInstructors: () => void;
  handleRemoveInstructor: (id: string) => Promise<void>;
}
