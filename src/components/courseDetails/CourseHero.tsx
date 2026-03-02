import { useSelector } from "react-redux";
import { IMAGES } from "../../constants/images";
import useCourseEnrollment from "./useCourseEnrollment";
import type { RootState } from "../../redux/store";
import type { CourseHeroProps } from "../../types/ui/course-details.types";
import COURSE_HERO_ICON from "../../assets/icons/course_hero_icon.png";

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { buttonText, handleEnrollClick, isCheckingEnrollment } =
    useCourseEnrollment(course.id, course.price ?? 0, user);

  return (
    <section className="bg-career-bg relative overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-gray-100">
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 md:px-8 lg:px-10 mx-auto">
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
              className="px-8 py-3 bg-primary text-white rounded-[4px] font-bold text-[16px] hover:bg-primary-hover transition-colors shadow-md disabled:bg-gray-400 w-full sm:w-auto cursor-pointer"
            >
              {buttonText}
            </button>
          </div>

          <p className="mt-4 text-[13px] sm:text-[14px] text-gray-500">
            <span className="font-bold text-text-primary">208,460</span> already
            enrolled
          </p>
        </div>
        <div className="flex justify-center lg:justify-start items-center my-auto mt-8 sm:mt-10 lg:mt-6 xl:mt-10 2xl:mt-12">
          <img
            src={COURSE_HERO_ICON}
            alt=""
            className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[230px] md:h-[230px] lg:w-[260px] lg:h-[260px] object-contain"
          />
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
