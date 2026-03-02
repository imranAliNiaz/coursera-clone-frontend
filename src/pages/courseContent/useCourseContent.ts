import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-hot-toast";
import {
  fetchCourseContent,
  refreshCourseProgress,
  updateLessonProgress,
} from "../../redux/slices/student/studentCourseContentSlice";
import type {
  CourseContentLesson,
  CourseContentModule,
  CourseContentLessonProgressItem,
  CourseContentTranscriptLine,
  CourseContentTab,
} from "../../types/student";

const transcript: CourseContentTranscriptLine[] = [
  {
    id: "t-001",
    startTime: 1,
    endTime: 38,
    text: "Welcome back. We're moments away from checking out an example of a crit session in action. A standard design critique session is at least 30 minutes, and the designer usually spends five to ten of those minutes presenting. But keep in mind, the session length will depend on the amount of feedback requested and the number of reviewers involved. We don't have time to share a full crit session with you. So the upcoming video is just a snapshot of what usually happens. In the mock crit session, I'll play the role of the presenter, sharing some of the mockups for the dog walker app with two colleagues who were the reviewers.",
  },
  {
    id: "t-002",
    startTime: 38,
    endTime: 78,
    text: "There will also be a facilitator guiding the flow of the interaction. While you've been working on your mockups throughout this course, so have I. The mockups I'll present in the design critique session are my current iteration of the dog walker app. As the presenter, I'll ask for feedback on two parts of this design, the scheduling flow and the call-to-action buttons. Remember, call-to-action buttons are elements in the design that tell the user to take action. In the dog walker app, the call-to-action buttons are labeled things like \"book appointment\" and \"next.\" You'll have a chance to watch how the flow of ideas and communication happens as I present my work and receive feedback.",
  },
  {
    id: "t-003",
    startTime: 78,
    endTime: 109,
    text: "As you watch, take note of how I, as the presenter, respond to the feedback I'm receiving. Ask yourself, is the presenter actively listening? Is the presenter taking notes? What types of follow-up questions is the presenter asking? You should also focus on the way that reviewers share their feedback and opinions. Ask yourself, do the reviewers share the reasoning behind their feedback? Do the reviewers focus on problems with the design instead of offering solutions?",
  },
  {
    id: "t-004",
    startTime: 109,
    endTime: 150,
    text: "Do the reviewers connect their feedback to the objectives of the design critique session? With these questions in mind, let's join the crit session. Meet you there.",
  },
];

const getStreamingUrl = (url?: string) => {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  return url.replace("/upload/", "/upload/f_auto,q_auto,fl_progressive/");
};

const formatUpdatedAt = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
};

const useCourseContent = (courseId?: string, lessonId?: string) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { course, progressData, loading } = useAppSelector(
    (state) => state.studentCourseContent,
  );

  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<CourseContentTab>("transcript");
  const [isCoachOpen, setIsCoachOpen] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSavedTime = useRef<number>(0);

  const currentLesson = useMemo<CourseContentLesson | undefined>(() => {
    return course?.modules
      ?.flatMap((m: CourseContentModule) => m.lessons)
      ?.find((l: CourseContentLesson) => l.id === lessonId);
  }, [course, lessonId]);

  const isLessonCompleted = (id: string) => {
    return progressData?.lessonProgress?.some(
      (p: CourseContentLessonProgressItem) => p.lessonId === id && p.completed,
    );
  };

  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() === "reading" &&
      activeTab === "transcript"
    ) {
      setActiveTab("notes-downloads");
    }
  }, [currentLesson?.id, currentLesson?.type, activeTab]);

  useEffect(() => {
    if (!courseId) return;
    dispatch(fetchCourseContent(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (lessonId && course?.modules) {
      const activeModule = course.modules.find((m: CourseContentModule) =>
        m.lessons.some((l: CourseContentLesson) => l.id === lessonId),
      );
      if (activeModule) {
        setExpandedModules([activeModule.id]);
      }
    }
  }, [lessonId, course?.modules]);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (
      currentLesson?.type?.toLowerCase() !== "video" ||
      !videoRef.current ||
      !progressData
    ) {
      return;
    }

    const lessonProgress = progressData.lessonProgress?.find(
      (p: CourseContentLessonProgressItem) => p.lessonId === lessonId,
    );
    if (!lessonProgress) return;

    const lastPlayed = lessonProgress.lastPlayed;
    if (!lastPlayed || lastPlayed <= 0) return;

    const videoEl = videoRef.current;
    const applyResume = () => {
      if (videoEl.currentTime < 1) {
        videoEl.currentTime = lastPlayed;
      }
    };

    if (videoEl.readyState >= 1) {
      applyResume();
    } else {
      videoEl.addEventListener("loadedmetadata", applyResume);
    }

    return () => {
      videoEl.removeEventListener("loadedmetadata", applyResume);
    };
  }, [lessonId, progressData, currentLesson]);

  useEffect(() => {
    const markReadingComplete = async () => {
      if (
        lessonId &&
        currentLesson?.type?.toLowerCase() === "reading" &&
        progressData?.enrollmentId &&
        !isLessonCompleted(lessonId)
      ) {
        try {
          await dispatch(
            updateLessonProgress({
              enrollmentId: progressData.enrollmentId,
              lessonId,
              courseId: courseId as string,
              data: { completed: true },
            }),
          ).unwrap();
        } catch (err) {
          toast.error("Failed to mark lesson as complete.");
        }
      }
    };
    markReadingComplete();
  }, [lessonId, progressData?.enrollmentId, currentLesson, courseId, dispatch]);

  const handleTimeUpdate = async () => {
    if (!videoRef.current || !progressData?.enrollmentId || !lessonId) return;

    const currentTime = videoRef.current.currentTime;
    const currentTimeInt = Math.floor(currentTime);
    const duration = Math.floor(videoRef.current.duration);

    if (
      currentTimeInt !== lastSavedTime.current &&
      (currentTimeInt % 10 === 0 ||
        (duration > 0 && currentTimeInt >= duration - 1))
    ) {
      lastSavedTime.current = currentTimeInt;

      const isNearEnd = duration > 0 && currentTimeInt >= duration * 0.98;
      const alreadyCompleted = isLessonCompleted(lessonId);

      try {
        const shouldComplete =
          alreadyCompleted || isNearEnd || currentTimeInt >= duration - 1;
        await dispatch(
          updateLessonProgress({
            enrollmentId: progressData.enrollmentId,
            lessonId,
            courseId: courseId as string,
            data: {
              lastPlayed: currentTimeInt,
              ...(shouldComplete ? { completed: true } : {}),
              videoDuration: duration,
            },
          }),
        ).unwrap();
      } catch (err) {
        toast.error("Failed to track progress.");
      }
    }
  };

  const handlePause = async () => {
    if (!videoRef.current || !progressData?.enrollmentId || !lessonId) return;
    const currentTimeInt = Math.floor(videoRef.current.currentTime);
    const duration = Math.floor(videoRef.current.duration || 0);

    try {
      await dispatch(
        updateLessonProgress({
          enrollmentId: progressData.enrollmentId,
          lessonId,
          courseId: courseId as string,
          data: {
            lastPlayed: currentTimeInt,
            videoDuration: duration || undefined,
          },
        }),
      ).unwrap();
    } catch (err) {
      toast.error("Failed to save pause progress.");
    }
  };

  const handleVideoEnded = async () => {
    if (!progressData?.enrollmentId || !lessonId || !videoRef.current) {
      return;
    }
    const duration = Math.floor(videoRef.current.duration || 0);
    try {
      await dispatch(
        updateLessonProgress({
          enrollmentId: progressData.enrollmentId,
          lessonId,
          courseId: courseId as string,
          data: {
            lastPlayed: duration,
            completed: true,
            videoDuration: duration || undefined,
          },
        }),
      ).unwrap();
    } catch (err) {
      toast.error("Failed to complete video.");
    }
  };

  const handleNext = async () => {
    if (!progressData?.enrollmentId || !lessonId) return;

    try {
      if (!isLessonCompleted(lessonId)) {
        await dispatch(
          updateLessonProgress({
            enrollmentId: progressData.enrollmentId,
            lessonId,
            courseId: courseId as string,
            data: {
              completed: true,
              forceComplete: currentLesson?.type?.toLowerCase() === "reading",
            },
          }),
        ).unwrap();
      }

      const allLessons =
        course?.modules?.flatMap((m: CourseContentModule) => m.lessons) || [];
      const currentIndex = allLessons.findIndex(
        (l: CourseContentLesson) => l.id === lessonId,
      );

      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        if (nextLesson.type?.toLowerCase() === "assessment") {
          navigate(`/learn/${courseId}/assessment/${nextLesson.id}`);
        } else {
          navigate(`/learn/${courseId}/lecture/${nextLesson.id}`);
        }
        dispatch(refreshCourseProgress(courseId as string));
      } else {
        navigate(`/learn/${courseId}`);
      }
    } catch (err) {
      toast.error("Failed to update progress.");
    }
  };

  const handleCloseCourse = () => {
    navigate(`/learn/${courseId}`);
  };

  const handleBackToDashboard = () => {
    navigate("/my-learning");
  };

  return {
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
    progressData,
    setActiveTab,
    setIsCoachOpen,
    toggleModule,
    transcript,
    videoRef,
  };
};

export default useCourseContent;
