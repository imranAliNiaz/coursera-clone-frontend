import React from "react";
import { useParams, Link } from "react-router-dom";
import CourseContentHeader from "../../components/layout/CourseContentHeader";
import { IMAGES } from "../../constants/images";
import useCourseContent from "./useCourseContent";
import type {
  CourseContentModule,
  CourseContentLesson,
} from "../../types/student";

const CourseContent: React.FC = () => {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  const {
    activeTab,
    course,
    currentLesson,
    expandedModules,
    formatUpdatedAt,
    getStreamingUrl,
    handleBackToDashboard,
    handleCloseCourse,
    handleNext,
    handlePause,
    handleTimeUpdate,
    handleVideoEnded,
    isCoachOpen,
    isLessonCompleted,
    loading,

    setActiveTab,
    setIsCoachOpen,
    toggleModule,
    transcript,
    videoRef,
  } = useCourseContent(courseId, lessonId);

  if (loading)
    return (
      <div className="min-h-screen bg-white font-sans text-text-primary">
        <CourseContentHeader />
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-[3px] border-border" />
              <div className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
            </div>
            <div className="text-[13px] text-text-secondary font-medium">
              Loading course content
            </div>
          </div>
        </div>
      </div>
    );
  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Content unavailable
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          We couldn't find the course or lesson you were looking for. It might
          have been deleted by the instructor.
        </p>
        <button
          onClick={handleBackToDashboard}
          className="px-8 py-3 bg-primary text-white font-bold rounded-[4px] hover:bg-primary-hover transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary overflow-x-hidden">
      <CourseContentHeader />

      <div className="flex flex-col lg:flex-row bg-white min-h-[calc(100vh-64px)] overflow-hidden">
        <aside className="w-full lg:w-[350px] border rounded-b-3xl border-mylearning-border-muted bg-white overflow-y-visible lg:overflow-y-auto flex flex-col shrink-0 custom-scrollbar relative z-10 h-auto lg:h-[calc(100vh-64px)]">
          <div className="p-4 py-6 sm:py-8 border-b border-mylearning-border-muted sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-[14px] font-bold text-text-primary leading-snug">
                {course.title}
              </h2>
              <button
                onClick={handleCloseCourse}
                className="text-primary hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-bold text-[24px] leading-none shrink-0"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="flex-1 pb-6 lg:pb-10">
            {course.modules?.map(
              (module: CourseContentModule, index: number) => (
                <div
                  key={module.id}
                  className="border-b border-mylearning-border-muted"
                >
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`w-full flex items-center justify-between p-4 py-4 sm:py-5 text-left hover:bg-surface ${
                      expandedModules.includes(module.id) ? "bg-surface" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] text-text-secondary font-medium">
                          Module {index + 1}
                        </p>
                        <svg
                          className={`w-5 h-5 text-text-secondary transition-transform ${
                            expandedModules.includes(module.id)
                              ? "rotate-180"
                              : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      <p
                        className={`text-[13px] sm:text-[14px] mt-1 ${
                          expandedModules.includes(module.id)
                            ? "font-bold text-text-primary"
                            : "font-medium text-dashboard-heading"
                        }`}
                      >
                        {module.title}
                      </p>
                    </div>
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="bg-white pb-2">
                      {module.lessons.map((lesson: CourseContentLesson) => {
                        const isActive = lesson.id === lessonId;
                        const isComplete = isLessonCompleted(lesson.id);

                        return (
                          <Link
                            key={lesson.id}
                            to={
                              lesson.type?.toLowerCase() === "assessment"
                                ? `/learn/${courseId}/assessment/${lesson.id}`
                                : `/learn/${courseId}/lecture/${lesson.id}`
                            }
                            className={`flex items-start gap-3 p-4 py-3 sm:py-4 cursor-pointer transition-colors ${
                              isActive
                                ? "bg-learn-active-bg relative"
                                : "hover:bg-surface"
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary" />
                            )}
                            <div className="shrink-0 mt-0.5">
                              {isComplete ? (
                                <svg
                                  className="w-[18px] h-[18px] text-status-success-dark"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                              ) : (
                                <div className="w-[18px] h-[18px] border-2 border-mylearning-border-muted rounded-full" />
                              )}
                            </div>
                            <div>
                              <p
                                className={`text-[12px] sm:text-[13px] leading-tight ${
                                  isActive
                                    ? "text-primary font-bold"
                                    : "text-dashboard-heading font-normal"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[11px] text-text-secondary font-medium">
                                  {(lesson.type || "Lesson")
                                    .toString()
                                    .toLowerCase()
                                    .replace(/^./, (c: string) =>
                                      c.toUpperCase(),
                                    )}{" "}
                                  {"\u2022"}{" "}
                                  {lesson.duration
                                    ? `${Math.floor(lesson.duration / 60)} min`
                                    : "5 min"}
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </aside>

        <main className="flex-1 lg:overflow-y-auto bg-white custom-scrollbar relative">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 pb-24 sm:pb-32">
            {currentLesson.type?.toLowerCase() !== "video" && (
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <h1 className="text-[22px] sm:text-[26px] md:text-[28px] font-normal text-text-primary leading-tight">
                    {currentLesson.title}
                  </h1>
                  {currentLesson.updatedAt && (
                    <p className="mt-1 text-[12px] text-text-secondary">
                      Updated {formatUpdatedAt(currentLesson.updatedAt)}
                    </p>
                  )}
                </div>
                {currentLesson.type?.toLowerCase() !== "assessment" && (
                  <button className="flex items-center gap-2 text-primary font-bold text-[13px] sm:text-[14px] hover:bg-learn-active-bg px-3 py-2 rounded-md transition-colors whitespace-nowrap">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Save note
                  </button>
                )}
              </div>
            )}

            <div className="mb-8">
              {currentLesson.type?.toLowerCase() === "video" ? (
                <div className="aspect-video bg-black rounded-[8px] overflow-hidden shadow-lg">
                  {currentLesson.videoUrl ? (
                    <video
                      ref={videoRef}
                      src={getStreamingUrl(currentLesson.videoUrl)}
                      controls
                      className="w-full h-full"
                      onTimeUpdate={handleTimeUpdate}
                      onPause={handlePause}
                      onEnded={handleVideoEnded}
                      autoPlay={false}
                      preload="metadata"
                    />
                  ) : (
                    <div className="relative w-full h-full group">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
                        alt="Video content"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 cursor-pointer hover:scale-105 transition-transform">
                          <svg
                            className="w-10 h-10 text-white fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-text-primary leading-relaxed">
                  <div className="p-4 sm:p-6 md:p-8 bg-surface rounded-[8px] border border-mylearning-border-muted">
                    {currentLesson.content || "No content available."}
                  </div>
                </div>
              )}
            </div>

            {currentLesson.type?.toLowerCase() === "video" && (
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <h1 className="text-[22px] sm:text-[26px] md:text-[28px] font-normal text-text-primary leading-tight">
                    {currentLesson.title}
                  </h1>
                  {currentLesson.updatedAt && (
                    <p className="mt-1 text-[12px] text-text-secondary">
                      Updated {formatUpdatedAt(currentLesson.updatedAt)}
                    </p>
                  )}
                </div>
                <button className="flex items-center gap-2 text-primary font-bold text-[13px] sm:text-[14px] hover:bg-learn-active-bg px-3 py-2 rounded-md transition-colors whitespace-nowrap">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Save note
                </button>
              </div>
            )}

            {currentLesson.type?.toLowerCase() === "video" && (
              <div className="bg-learn-coach-bg rounded-[16px] p-4 sm:p-6 mb-8 sm:mb-12 border border-transparent hover:border-mylearning-border-muted transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[18px] italic text-dashboard-heading font-medium tracking-tight">
                    coach
                  </span>
                  <button
                    onClick={() => setIsCoachOpen((prev) => !prev)}
                    className="text-text-secondary hover:bg-white/50 p-1 rounded-md"
                    aria-label="Toggle coach section"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform ${isCoachOpen ? "" : "-rotate-90"}`}
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                </div>
                {isCoachOpen && (
                  <>
                    <p className="text-[13px] sm:text-[14px] text-text-primary mb-4 sm:mb-6 leading-relaxed">
                      Let me know if you have any questions about this material,
                      I&apos;m here to help!
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {[
                        "Give me practice questions",
                        "Explain this topic in simple terms",
                        "Give me a summary",
                        "Give me real-life examples",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          className="flex items-center gap-2 bg-white border border-mylearning-border-muted px-4 py-2.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium text-text-primary hover:bg-surface shadow-sm transition-all active:scale-[0.98]"
                        >
                          <svg
                            className="w-4 h-4 text-primary"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                          </svg>
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {currentLesson.type?.toLowerCase() === "video" && (
              <>
                <div className="border-b border-mylearning-border-muted mb-6 sm:mb-8">
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {["Transcript", "Notes & Downloads"].map((tab) => {
                      const slug =
                        tab === "Transcript" ? "transcript" : "notes-downloads";
                      return (
                        <button
                          key={tab}
                          onClick={() =>
                            setActiveTab(
                              slug as "transcript" | "notes-downloads",
                            )
                          }
                          className={`pb-3 text-[13px] sm:text-[14px] font-bold border-b-[3px] transition-all ${
                            activeTab === slug
                              ? "border-primary text-primary"
                              : "border-transparent text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeTab === "transcript" && (
                  <div className="mb-10">
                    <div className="space-y-4">
                      {transcript && transcript.length > 0 ? (
                        transcript.map((line) => (
                          <div key={line.id} className="group cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] text-primary font-bold">
                                {Math.floor(line.startTime / 60)}:
                                {String(line.startTime % 60).padStart(2, "0")}
                              </span>
                            </div>
                            <p className="text-[13px] sm:text-[14px] leading-[1.6] text-text-secondary group-hover:text-text-primary">
                              {line.text}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 bg-surface rounded-lg border border-dashed border-mylearning-border-muted">
                          <p className="text-text-secondary">
                            Transcript not available for this lesson.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "notes-downloads" && (
                  <div className="pb-24 sm:pb-32">
                    <div className="p-4 sm:p-6 md:p-8 text-center bg-surface rounded-lg border border-dashed border-mylearning-border-muted">
                      <p className="text-text-secondary">
                        Your notes and downloads for this lesson will appear
                        here.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="fixed bottom-0 right-0 left-0 lg:left-[350px] bg-white/80 backdrop-blur-sm border-t border-mylearning-border-muted h-[72px] sm:h-[80px] p-2 px-4 sm:px-6 z-40 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-[12px] sm:gap-6 sm:text-[13px] mb-2 sm:mb-3">
              <button className="flex items-center gap-1 text-primary cursor-pointer bg-transparent border-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 10h4v10H2zM6 10l4-7h4a2 2 0 012 2v5h4l-3 10H6"
                  />
                </svg>
                Like
              </button>
              <button className="flex items-center gap-1 text-primary cursor-pointer bg-transparent border-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 14h4V4H2zM6 14l4 7h4a2 2 0 002-2v-5h4l-3-10H6"
                  />
                </svg>
                Dislike
              </button>
              <button className="flex items-center gap-1 text-primary cursor-pointer bg-transparent border-none">
                <img src={IMAGES.UI.REPORT_ICON} alt="" className="w-3 h-3" />
                Report an issue
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={
                  (currentLesson.type?.toLowerCase() === "assessment" &&
                    !isLessonCompleted(currentLesson.id)) ||
                  (currentLesson.type?.toLowerCase() === "video" &&
                    !isLessonCompleted(currentLesson.id))
                }
                className={`flex items-center gap-2 px-4 py-2 text-[12px] sm:px-5 sm:py-2.5 sm:text-[13px] lg:px-6 lg:text-[14px] rounded-[4px] font-bold transition-colors ${
                  isLessonCompleted(currentLesson.id)
                    ? "bg-primary text-white hover:bg-primary-hover"
                    : currentLesson.type?.toLowerCase() === "assessment" ||
                        currentLesson.type?.toLowerCase() === "video"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white border border-[#0056D2] text-[#0056D2] hover:bg-[#f0f7ff]"
                }`}
              >
                {isLessonCompleted(currentLesson.id)
                  ? "Go to next item"
                  : currentLesson.type?.toLowerCase() === "assessment"
                    ? "Locked (Pass to continue)"
                    : currentLesson.type?.toLowerCase() === "video"
                      ? "Go to next item"
                      : "Mark as completed"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseContent;
