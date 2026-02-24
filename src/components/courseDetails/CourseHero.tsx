import { useSelector } from "react-redux";
import { IMAGES } from "../../constants/images";
import useCourseEnrollment from "./useCourseEnrollment";
import type { RootState } from "../../redux/store";
import type { CourseHeroProps } from "../../types/ui/course-details.types";

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { buttonText, handleEnrollClick, isCheckingEnrollment } =
    useCourseEnrollment(course.id, course.price ?? 0, user);

  return (
    <section className="bg-career-bg relative overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-gray-100 px-4 md:px-0">
      <div className="max-w-[1200px] 2xl:max-w-[1360px] grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 mx-auto">
        <div className="z-10">
          <div className="mb-6 flex items-center">
            <img
              src={IMAGES.LOGOS.GOOGLE_WORDMARK}
              alt="Google"
              className="h-[28px] w-auto"
            />
          </div>

          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-normal text-course-hero-heading leading-[1.1] mb-4 sm:mb-6 tracking-tight">
            {course.title}
          </h1>

          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-700 leading-relaxed mb-4 sm:mb-5 max-w-[600px]">
            {course.subtitle || course.description?.substring(0, 150) + "..."}
          </p>

          <div className="flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-700 mb-6 sm:mb-8">
            <img
              src={IMAGES.LOGOS.GOOGLE_LOGO}
              alt="Google"
              className="w-4 h-4 object-contain"
            />
            <span className="text-text-primary">Instructor:</span>
            <span>
              {course.instructor?.name || "Google career certificates"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <button
              onClick={handleEnrollClick}
              disabled={isCheckingEnrollment}
              className="px-8 py-3 bg-primary text-white rounded-[4px] font-bold text-[16px] hover:bg-primary-hover transition-colors shadow-md disabled:bg-gray-400 w-full sm:w-auto"
            >
              {buttonText}
            </button>
          </div>

          <p className="mt-4 text-[13px] sm:text-[14px] text-gray-500">
            <span className="font-bold text-text-primary">208,460</span> already
            enrolled
          </p>
        </div>

        <div className="hidden lg:flex justify-end pr-6 xl:pr-8">
          <div className="relative w-[360px] h-[280px] xl:w-[450px] xl:h-[350px]">
            <div className="absolute top-0 right-0 w-full h-full bg-skeleton-alt rounded-[24px] rotate-3 opacity-40"></div>
            <div className="absolute top-0 right-0 w-full h-full border border-blue-100 rounded-[24px] -rotate-2"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full h-full bg-white/60 backdrop-blur-sm rounded-[16px] shadow-sm flex items-center justify-center overflow-hidden border border-gray-100">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-course-border-subtle)"
                  strokeWidth="0.5"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 p-8 opacity-20 hidden lg:block">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-blue-400 rounded-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
