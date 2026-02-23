import React from "react";
import Button from "../common/Button";
import useCareerSkills from "./hooks/useCareerSkills";

const CareerSkills: React.FC = () => {
  const {
    isLoading,
    showAll,
    setShowAll,
    visibleCourses,
    remainingCount,
    handleCourseClick,
  } = useCareerSkills();

  if (isLoading) {
    return (
      <section className="bg-surface py-1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-career-bg rounded-[16px] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/4 flex flex-col items-start gap-6">
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-44 bg-gray-200 rounded animate-pulse hidden md:block"></div>
              </div>
              <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-career-border overflow-hidden"
                  >
                    <div className="aspect-[16/9] m-2 rounded-[12px] bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center md:justify-start md:ml-[27%] mt-1">
              <div className="h-10 w-36 bg-gray-200 rounded animate-pulse hidden md:block"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse md:hidden"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface py-1 container mx-auto rounded-2xl">
      <div className="px-2 sm:px-4 md:px-6">
        <div className="bg-career-bg rounded-[16px] p-5 sm:p-6 md:p-8 lg:p-10 2xl:p-12">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Left Header Area */}
            <div className="md:w-1/3 lg:w-1/4 flex flex-col items-start gap-2 md:gap-1 mt-2 sm:mt-4 md:mt-6 lg:mt-20">
              <h2 className="text-[24px] md:text-[26px] font-normal text-career-heading leading-tight font-sans">
                Career skills that work
              </h2>
              <div className="hidden md:flex">
                <Button
                  variant="outline"
                  className="!bg-white !text-primary !border-primary !font-bold !border !py-2 md:!py-3 !px-4 md:!px-6 hover:!bg-blue-50 !rounded-[5px] text-[14px] md:text-[16px] whitespace-nowrap"
                >
                  Start 7-day Free Trial
                </Button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="md:w-2/3 lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-5">
              {visibleCourses.map((course, index) => (
                <div
                  key={index}
                  onClick={() => handleCourseClick(course.id)}
                  className="bg-white rounded-lg shadow-sm border border-career-border overflow-hidden flex flex-col hover:shadow-card transition-shadow cursor-pointer h-full"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] m-2">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-[10px]"
                    />
                    {index === 2 && (
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold border border-gray-200 shadow-sm flex items-center gap-1">
                        <span>âœ¨</span> AI skills
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={course.logo}
                        alt={course.university}
                        className="w-6 h-6 object-contain rounded-sm"
                      />
                      <span className="text-xs text-text-secondary truncate">
                        {course.university}
                      </span>
                    </div>
                    <h3 className="font-bold text-text-primary text-[16px] mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-auto">
                      {course.type}
                    </p>
                  </div>
                </div>
              ))}

              {/* Mobile-only CTA */}
              <div className="w-full flex justify-center md:hidden mt-4">
                <Button
                  variant="outline"
                  className="!bg-white !text-primary !border-primary !font-bold !border !py-3 !px-6 hover:!bg-blue-50 !rounded-[5px] text-[16px] w-full"
                >
                  Start 7-day Free Trial
                </Button>
              </div>
            </div>
          </div>

          {!showAll && remainingCount > 0 && (
            <div className="flex justify-center md:justify-start md:pl-[calc(33.333%+2rem)] lg:pl-[calc(25%+2rem)] mt-2 md:mt-1">
              <div className="hidden md:flex">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  className="!bg-white !text-primary !border-primary !font-bold !border !py-3 !px-8 hover:!bg-blue-50 !rounded-[5px] text-[16px]"
                >
                  Show {remainingCount} more
                </Button>
              </div>
              <div className="flex md:hidden w-full">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  className="!bg-white !text-primary !border-primary !font-bold !border !py-3 !px-6 hover:!bg-blue-50 !rounded-[5px] text-[16px] w-full justify-center"
                >
                  Show more
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerSkills;
