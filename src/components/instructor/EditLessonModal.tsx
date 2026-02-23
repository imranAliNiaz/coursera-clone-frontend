import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import api from "../../services/apiClient";

interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: {
    id?: string;
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  }) => void;
  lesson: {
    id?: string;
    title: string;
    type: "VIDEO" | "READING" | "ASSESSMENT";
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  } | null;
  mode?: "edit" | "create";
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface AssessmentContent {
  title: string;
  passingScore: number;
  questions: AssessmentQuestion[];
  instructions?: string;
}

const EditLessonModal: React.FC<EditLessonModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lesson,
  mode = "edit",
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [assessmentErrors, setAssessmentErrors] = useState<string[]>([]);
  const [assessmentWarnings, setAssessmentWarnings] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const lastLessonKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (lesson) {
      const lessonKey = lesson.id
        ? lesson.id
        : `${lesson.title}-${lesson.type}`;
      lastLessonKeyRef.current = lessonKey;

      setTitle(lesson.title);
      setDescription(lesson.description || "");
      setContent(lesson.content || "");
      setAssessmentErrors([]);
      setAssessmentWarnings([]);
      if (lesson.type === "VIDEO") {
        const existingUrl = lesson.videoUrl || "";
        setVideoUrl(existingUrl || null);
        setDuration(
          typeof lesson.duration === "number" ? lesson.duration : null,
        );
        setVideoReady(Boolean(existingUrl) && mode === "edit");
      }
    }
  }, [lesson, mode]);

  if (!isOpen || !lesson) return null;

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const toastId = toast.loading("Uploading video...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const responseData = uploadResponse.data || {};
      const fileUrl = responseData.videoUrl || responseData.secure_url || "";
      const videoDuration = responseData.duration;

      if (!fileUrl) {
        throw new Error("Cloudinary did not return a video URL.");
      }

      setVideoUrl(fileUrl);
      setDuration(videoDuration ?? 0);
      setVideoReady(true);

      toast.success("Video uploaded successfully", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const validateAssessmentContent = (raw: string) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    let parsed: unknown = null;

    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      errors.push("Invalid JSON format. Please check your syntax.");
      return { errors, warnings };
    }

    if (!parsed || typeof parsed !== "object") {
      errors.push("Assessment content must be a JSON object.");
      return { errors, warnings };
    }

    const content = parsed as AssessmentContent;

    if (!content.title || typeof content.title !== "string") {
      errors.push("Assessment title is required and must be a string.");
    }
    if (typeof content.passingScore !== "number") {
      errors.push("Passing score is required and must be a number.");
    }

    if (!Array.isArray(content.questions) || content.questions.length === 0) {
      errors.push("Assessment must include at least one question.");
    } else {
      content.questions.forEach((q, index: number) => {
        const label = `Question ${index + 1}`;
        if (!q.id || typeof q.id !== "string") {
          errors.push(`${label} is missing a string 'id'.`);
        }
        if (!q.question || typeof q.question !== "string") {
          errors.push(`${label} is missing 'question' text.`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          errors.push(`${label} must have exactly 4 options.`);
        }
        if (
          typeof q.correctAnswerIndex !== "number" ||
          q.correctAnswerIndex < 0 ||
          q.correctAnswerIndex > 3
        ) {
          errors.push(`${label} has invalid correctAnswerIndex (must be 0-3).`);
        }
      });
    }

    if (content.instructions && typeof content.instructions !== "string") {
      warnings.push("Instructions should be a string if provided.");
    }

    return { errors, warnings };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const effectiveTitle = mode === "create" ? lesson.title : title;
    const effectiveDescription =
      mode === "create" ? lesson.description || "" : description;

    if (lesson.type === "VIDEO" && !videoUrl) {
      toast.error("Please upload the video to Cloudinary first.");
      return;
    }

    if (lesson.type === "ASSESSMENT") {
      const { errors, warnings } = validateAssessmentContent(content);
      setAssessmentErrors(errors);
      setAssessmentWarnings(warnings);
      if (errors.length > 0) {
        return;
      }
    }

    if (effectiveTitle.trim()) {
      const cleanedDescription = effectiveDescription.trim();
      onSave({
        ...(mode === "edit" ? { id: lesson.id } : {}),
        title: effectiveTitle,
        description: cleanedDescription ? cleanedDescription : undefined,
        content:
          lesson.type === "READING" || lesson.type === "ASSESSMENT"
            ? content
            : undefined,
        videoUrl: lesson.type === "VIDEO" ? videoUrl || undefined : undefined,
        duration: lesson.type === "VIDEO" ? (duration ?? null) : undefined,
      });
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="edit-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                lesson.type === "VIDEO"
                  ? "bg-indigo-100"
                  : lesson.type === "READING"
                    ? "bg-green-100"
                    : "bg-purple-100"
              }`}
            >
              {lesson.type === "VIDEO" && (
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
              {lesson.type === "READING" && (
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              )}
              {lesson.type === "ASSESSMENT" && (
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="edit-modal-title"
              >
                {mode === "edit" ? "Edit" : "Add"}{" "}
                {lesson.type === "VIDEO"
                  ? "Video"
                  : lesson.type === "READING"
                    ? "Reading"
                    : "Assessment"}{" "}
                {mode === "edit" ? "Lesson" : "Lesson Content"}
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {mode === "edit" && (
                  <>
                    <div>
                      <label
                        htmlFor="edit-title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lesson Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="edit-title"
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="edit-description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lesson Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="edit-description"
                          name="description"
                          rows={4}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                          placeholder="Short summary shown to learners (optional)"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {lesson.type === "READING" && (
                  <div>
                    <label
                      htmlFor="edit-content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reading Content
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="edit-content"
                        name="content"
                        rows={10}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-sm"
                        placeholder="Enter lesson content here (Markdown supported)..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {lesson.type === "ASSESSMENT" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="edit-assessment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Assessment JSON Data
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const template = {
                            title: "Quiz Title",
                            instructions: "Please select the correct answer.",
                            questions: [
                              {
                                id: "q1",
                                question: "What is React?",
                                options: [
                                  "A Library",
                                  "A Framework",
                                  "A Language",
                                  "A Database",
                                ],
                                correctAnswerIndex: 0,
                              },
                            ],
                            passingScore: 60,
                          };
                          setContent(JSON.stringify(template, null, 2));
                          setAssessmentErrors([]);
                          setAssessmentWarnings([]);
                        }}
                        className="text-[12px] text-indigo-600 font-bold hover:underline"
                      >
                        Insert Template
                      </button>
                    </div>

                    {(assessmentErrors.length > 0 ||
                      assessmentWarnings.length > 0) && (
                      <div className="space-y-3">
                        {assessmentErrors.length > 0 && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4">
                            <h4 className="text-sm font-bold text-red-800 mb-1">
                              Fix these errors before saving:
                            </h4>
                            <ul className="text-xs text-red-700 list-disc ml-4 space-y-1">
                              {assessmentErrors.map((err) => (
                                <li key={err}>{err}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {assessmentWarnings.length > 0 && (
                          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                            <h4 className="text-sm font-bold text-amber-800 mb-1">
                              Warnings:
                            </h4>
                            <ul className="text-xs text-amber-700 list-disc ml-4 space-y-1">
                              {assessmentWarnings.map((warn) => (
                                <li key={warn}>{warn}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                      <h4 className="text-sm font-bold text-amber-800 mb-1">
                        Instructional Guide:
                      </h4>
                      <ul className="text-xs text-amber-700 list-disc ml-4 space-y-1">
                        <li>
                          Each question MUST include a unique string `id`.
                        </li>
                        <li>Each question MUST have exactly 4 options.</li>
                        <li>
                          `correctAnswerIndex` must be 0, 1, 2, or 3 (0 = first
                          option).
                        </li>
                        <li>`passingScore` is a number (e.g., 60).</li>
                      </ul>
                    </div>

                    <div className="mt-1">
                      <textarea
                        id="edit-assessment"
                        name="content"
                        rows={12}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border text-[13px] bg-slate-50"
                        placeholder="Paste Assessment JSON here..."
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                          if (assessmentErrors.length > 0) {
                            setAssessmentErrors([]);
                          }
                          if (assessmentWarnings.length > 0) {
                            setAssessmentWarnings([]);
                          }
                        }}
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const { errors, warnings } =
                              validateAssessmentContent(content);
                            setAssessmentErrors(errors);
                            setAssessmentWarnings(warnings);
                          }}
                          className="text-[12px] text-slate-800 font-bold hover:underline"
                        >
                          Validate JSON
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            try {
                              const parsed = JSON.parse(content);
                              setContent(JSON.stringify(parsed, null, 2));
                            } catch {
                              setAssessmentErrors([
                                "Invalid JSON format. Please check your syntax.",
                              ]);
                            }
                          }}
                          className="text-[12px] text-slate-800 font-bold hover:underline"
                        >
                          Format JSON
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {lesson.type === "VIDEO" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Video File
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="video/*"
                          disabled={uploading}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {uploading && (
                          <span className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                            Uploading...
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Supported formats: MP4, WebM, Ogg. Max size: 100MB.
                      </p>
                      <div className="mt-3">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                          Video URL
                        </label>
                        <input
                          type="text"
                          value={videoUrl || ""}
                          readOnly
                          placeholder="Upload to generate Cloudinary URL"
                          className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700"
                        />
                      </div>
                    </div>

                    {typeof duration === "number" && (
                      <p className="text-xs text-gray-500">
                        Duration: {Math.floor(duration / 60)}:
                        {String(duration % 60).padStart(2, "0")}
                      </p>
                    )}
                    {videoReady && typeof duration === "number" && (
                      <div className="inline-flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-md px-2 py-1">
                        <span className="font-semibold">Video ready</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={
                      mode === "create" &&
                      lesson.type === "VIDEO" &&
                      (!videoReady || uploading || typeof duration !== "number")
                    }
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                      mode === "create" &&
                      lesson.type === "VIDEO" &&
                      (!videoReady || uploading)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                    }`}
                  >
                    {mode === "edit" ? "Save Changes" : "Create Lesson"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLessonModal;
