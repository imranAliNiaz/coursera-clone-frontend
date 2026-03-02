import React from "react";
import { useParams, Link } from "react-router-dom";
import CourseLearningHeader from "../../components/layout/CourseLearningHeader";
import { IMAGES } from "../../constants/images";
import useCourseLearning from "./useCourseLearning";

const CourseLearning: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const {
    course,
    expandedSections,
    handleBackToDashboard,
    handleResumeLesson,
    isCourseMaterialOpen,
    isObjectivesOpen,
    isTopInfoOpen,
    learningObjectives,
    loading,
    sections,
    setIsCourseMaterialOpen,
    setIsObjectivesOpen,
    setIsTopInfoOpen,
    toggleSection,
  } = useCourseLearning(courseId);

  if (loading)
    return (
      <div className="min-h-screen bg-white font-sans text-text-primary">
        <CourseLearningHeader />
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
  if (!course) {
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
          Course not found
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The course you're looking for might have been removed or you don't
          have access to it.
        </p>
        <button
          onClick={handleBackToDashboard}
          className="px-8 py-3 bg-primary text-white font-bold rounded-[4px] hover:bg-primary-hover transition-colors"
        >
          Go to My Learning
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary overflow-x-hidden">
      <CourseLearningHeader />

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Course Navigation */}
        <aside className="w-full lg:w-[300px] border-r border-mylearning-border-muted bg-white h-auto lg:h-[calc(100vh-64px)] overflow-y-visible lg:overflow-y-auto sticky lg:top-[64px] shrink-0 custom-scrollbar">
          <div className="p-4 pt-5 sm:pt-6">
            <div className="flex flex-col items-start text-left mb-8 sm:mb-10 sm:ml-6">
              <div className="w-16 h-16 rounded-full shrink-0 overflow-hidden bg-white flex items-start justify-start mb-2">
                <img
                  src={IMAGES.LOGOS.GOOGLE_LOGO}
                  alt="Google"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="text-[13px] font-medium text-text-primary leading-snug">
                  {course.title}
                </span>
                <span className="text-[12px] text-text-secondary">Google</span>
                <span className="text-[12px] text-text-secondary">
                  {course.instructor?.name || "Instructor"}
                </span>
              </div>
            </div>

            <div className="mb-3 sm:ml-6">
              <button
                onClick={() => setIsCourseMaterialOpen((prev) => !prev)}
                className="flex items-center gap-2 w-full text-left bg-transparent border-none cursor-pointer"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-text-secondary transition-transform ${
                    isCourseMaterialOpen ? "" : "rotate-180"
                  }`}
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                <h2 className="text-[12px] font-bold text-text-primary uppercase tracking-wide">
                  Course Material
                </h2>
              </button>
            </div>

            {isCourseMaterialOpen && (
              <div className="relative pl-2 space-y-0">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`relative pl-8 py-2 rounded-[6px] mx-1 sm:mx-2 ${
                      section.isExpanded ? "bg-learn-active-bg" : ""
                    }`}
                  >
                    {section.isExpanded && (
                      <div className="absolute left-[6px] top-1 bottom-1 w-[3px] bg-primary rounded-full" />
                    )}
                    {/* Module item */}
                    <div className="absolute left-[19px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white z-10 flex items-center justify-center">
                      {section.isComplete ? (
                        <div className="w-4 h-4 rounded-full bg-mylearning-success flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-mylearning-border-muted bg-white"></div>
                      )}
                    </div>
                    <button
                      className={`text-left text-[14px] font-medium w-full truncate pl-2 ${
                        section.isExpanded
                          ? "text-text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      Module {index + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 sm:mt-8 pt-4 border-t border-mylearning-border-muted space-y-1">
              {[
                {
                  label: "Grades",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6z",
                },
                {
                  label: "Notes",
                  icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                },
                {
                  label: "Discussion Forums",
                  icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
                },
                {
                  label: "Messages",
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
                {
                  label: "Course Info",
                  icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-[6px] hover:bg-surface text-text-primary transition-colors bg-transparent border-none cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                  <span className="text-[14px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0 bg-white">
          <div className="max-w-[610px] w-full mx-auto mt-5 sm:mt-6 mb-10 sm:mb-16 px-4 sm:px-6 md:px-8 py-6 sm:py-8 border border-career-border rounded-[12px]">
            {/* Top Info Block */}
            <div className="mb-8 sm:mb-10">
              <div className="flex items-start gap-2 mb-4">
                <button
                  onClick={() => setIsTopInfoOpen((prev) => !prev)}
                  className="text-text-secondary hover:bg-gray-100 p-2 rounded-full -ml-2"
                  aria-label="Toggle section"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${
                      isTopInfoOpen ? "" : "-rotate-90"
                    }`}
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
                <div className="flex-1">
                  <h2 className="text-[20px] font-normal text-text-primary">
                    {course.title}
                  </h2>
                </div>
              </div>

              {isTopInfoOpen && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 mb-4 sm:ml-10 text-[13px] text-text-secondary">
                    <div className="flex items-center gap-2">
                      <img
                        src={IMAGES.UI.VIDEO_ICON}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>18 min of videos left</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={IMAGES.UI.BOOK_ICON}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>2 min of readings left</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={IMAGES.UI.GRADE_ICON}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>1 graded assessment left</span>
                    </div>
                  </div>

                  <div className="h-px bg-border-dark my-5 -mx-4 sm:-mx-6 md:-mx-8"></div>

                  <div className="text-[14px] text-text-primary leading-loose mb-4">
                    <p>{course.description}</p>
                  </div>

                  <button
                    onClick={() => setIsObjectivesOpen((prev) => !prev)}
                    className="text-[14px] text-link font-bold flex items-center gap-1 sm:ml-6 hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${
                        isObjectivesOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    Show Learning Objectives
                  </button>
                  {isObjectivesOpen && learningObjectives.length > 0 && (
                    <div className="mt-4 sm:ml-6 space-y-2 text-[14px] text-text-primary">
                      {learningObjectives.map((item, idx) => (
                        <div key={`${item}-${idx}`} className="flex gap-2">
                          <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-text-primary"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sections List */}
            <div className="space-y-4">
              {sections.map((section) => {
                const isExpanded = expandedSections.includes(section.id);
                return (
                  <div key={section.id} className="">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between py-2 bg-transparent border-none cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <svg
                          className={`w-4 h-4 text-text-secondary transition-transform ${isExpanded ? "" : "-rotate-90"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[16px] font-normal text-dashboard-heading group-hover:text-primary transition-colors">
                          {section.title}
                        </span>
                      </div>
                      {section.isComplete && (
                        <div className="flex items-center gap-1 text-mylearning-success bg-learn-success-bg-light px-2 py-0.5 rounded text-[12px] font-bold uppercase tracking-wider">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Complete
                        </div>
                      )}
                    </button>

                    {/* Lessons List */}
                    {isExpanded && (
                      <div className="mt-2 sm:ml-8 sm:pl-4 space-y-6">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id} className="relative group">
                            <Link
                              to={
                                lesson.type?.toLowerCase() === "assessment"
                                  ? `/learn/${courseId}/assessment/${lesson.id}`
                                  : `/learn/${courseId}/lecture/${lesson.id}`
                              }
                              className="block"
                            >
                              <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="mt-1 shrink-0">
                                  {lesson.status === "completed" ? (
                                    <div className="w-8 h-8 rounded-full bg-mylearning-success flex items-center justify-center text-white">
                                      <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="3"
                                      >
                                        <path d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                                      <img
                                        src={
                                          lesson.type === "Video"
                                            ? IMAGES.UI.VIDEO_LESSON_PLAYER
                                            : lesson.type === "Reading"
                                              ? IMAGES.UI.READING_ARTICLE_ICON
                                              : IMAGES.UI.ASSESSMENT_ICON
                                        }
                                        alt=""
                                        className="w-8 h-8 object-contain"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Content */}
                                <div
                                  className={`flex-1 ${lesson.status === "in-progress" ? "sm:pr-28 sm:relative" : ""}`}
                                >
                                  <p
                                    className={`text-[14px] ${lesson.status === "in-progress" ? "font-bold" : "font-normal"} text-text-primary mb-1 group-hover:text-primary cursor-pointer`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-[12px] text-text-secondary">
                                    <span>
                                      {lesson.type} {"\u2022"}{" "}
                                      {lesson.duration
                                        ? `${Math.floor(lesson.duration / 60)} min`
                                        : "5 min"}
                                    </span>
                                  </div>

                                  {lesson.status === "in-progress" && (
                                    <div className="mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-0">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleResumeLesson(lesson);
                                        }}
                                        className="bg-primary text-white px-5 py-2 rounded-[6px] font-normal text-[13px] hover:bg-primary-hover transition-colors"
                                      >
                                        {lesson.type === "Assessment"
                                          ? "Start"
                                          : "Resume"}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Info Cards */}
        <aside className="w-full lg:w-[320px] bg-white h-auto lg:h-[calc(100vh-64px)] overflow-y-visible lg:overflow-y-auto sticky lg:top-[64px] p-4 sm:p-6 lg:pr-8 hidden lg:block">
          {/* Learning Plan */}
          <div className="rounded-[8px] border border-border p-5 mb-6 shadow-card">
            <h3 className="font-bold text-[16px] text-text-primary mb-3">
              Learning plan
            </h3>
            <p className="text-[14px] text-text-primary mb-5 leading-relaxed">
              You&apos;re on track with your 6-day learning plan this week. Keep
              up the excellent work!
            </p>
            <div className="flex justify-between items-center mb-5 px-1">
              {["M", "T", "W", "T", "F", "S", "S"].slice(0, 6).map((day, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    i < 6
                      ? "bg-learn-status-success text-white"
                      : "bg-transparent text-text-secondary"
                  }`}
                >
                  {i < 6 ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    day
                  )}
                </div>
              ))}
            </div>
            <button className="text-[14px] font-bold text-primary hover:underline bg-transparent border-none cursor-pointer p-0">
              Edit my learning plan
            </button>
          </div>

          {/* Course Timeline */}
          <div className="rounded-[8px] bg-learn-timeline-bg border border-learn-timeline-border p-5">
            <h3 className="font-bold text-[16px] text-text-primary mb-2">
              Course timeline
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px] font-bold text-learn-status-success bg-learn-success-bg-light px-2 py-0.5 rounded">
                Right on schedule!
              </span>
            </div>
            <p className="text-[14px] text-text-primary mb-6 leading-relaxed">
              You&apos;re making great progress! Keep this momentum going and
              you&apos;ll meet your deadlines and estimated end date.
            </p>

            <div className="relative pl-4 space-y-6">
              {/* Vertical Dashed Line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-[1.5px] border-l-2 border-dashed border-primary/30"></div>

              {/* Start Date */}
              <div className="relative pl-6">
                <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-text-secondary bg-white z-10"></div>
                <p className="text-[12px] text-text-secondary font-medium">
                  Start date: August 10, 2025
                </p>
              </div>

              {/* Deadlines */}
              <div className="relative pl-6">
                <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary z-10 box-content ring-4 ring-learn-timeline-bg"></div>
                <p className="text-[14px] text-text-primary font-bold mb-3">
                  Your next two deadlines
                </p>

                <div className="space-y-3">
                  <div className="bg-white rounded-[8px] border border-mylearning-border-muted p-3 shadow-soft">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[14px] font-bold text-primary hover:underline cursor-pointer">
                        Module 3 Challenge
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] bg-surface text-text-secondary px-1.5 py-0.5 rounded font-medium">
                        Graded Assignment
                      </span>
                      <span className="text-[12px] text-text-secondary">
                        Due in 2 days
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[8px] border border-mylearning-border-muted p-3 shadow-soft">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[14px] font-bold text-primary hover:underline cursor-pointer">
                        Module 4 Challenge
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] bg-surface text-text-secondary px-1.5 py-0.5 rounded font-medium">
                        Graded Assignment
                      </span>
                      <span className="text-[12px] text-text-secondary">
                        Due in 9 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated End Date */}
              <div className="relative pl-6">
                <div className="absolute left-[1px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-text-secondary bg-white z-10"></div>
                <p className="text-[12px] text-text-secondary font-medium">
                  Estimated end date: November 15, 2025
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseLearning;
