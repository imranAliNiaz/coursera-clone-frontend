import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import CourseHero from "../../components/courseDetails/CourseHero";
import CourseInfoBar from "../../components/courseDetails/CourseInfoBar";
import CourseTabs from "../../components/courseDetails/CourseTabs";
import WhatYouWillLearn from "../../components/courseDetails/WhatYouWillLearn";
import SkillsGain from "../../components/courseDetails/SkillsGain";
import DetailsToKnow from "../../components/courseDetails/DetailsToKnow";
import AdvanceExpertise from "../../components/courseDetails/AdvanceExpertise";
import CourseSeries from "../../components/courseDetails/CourseSeries";
import CareerTestimonials from "../../components/courseDetails/CareerTestimonials";
import CourseSeriesSideCard from "../../components/courseDetails/CourseSeriesSideCard";
import { Link, useParams } from "react-router-dom";

import CourseDetailsSkeleton from "../../components/courseDetails/CourseDetailsSkeleton";
import useCourseDetails from "./useCourseDetails";

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading, seriesCourses } = useCourseDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <CourseDetailsSkeleton />
      </div>
    );
  }

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
          Course not available
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The course you're looking for might have been retired or you don't
          have access to it at this time.
        </p>
        <Link
          to="/search"
          className="px-8 py-3 bg-primary text-white font-bold rounded-[4px] hover:bg-primary-hover transition-colors"
        >
          Explore Other Courses
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <div className="bg-skeleton-alt/30">
        <div className="max-w-[1240px] 2xl:max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] sm:text-[14px] text-gray-700">
          <Link
            to="/"
            className="hover:text-primary transition-colors flex items-center"
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
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>
          <span className="text-gray-400 font-light text-[18px]">&rsaquo;</span>
          <Link to="/search" className="hover:text-primary transition-colors">
            Explore
          </Link>
          <span className="text-gray-400 font-light text-[18px]">&rsaquo;</span>
          <Link to="/search" className="hover:text-primary transition-colors">
            Professional Certificates
          </Link>
          <span className="text-gray-400 font-light text-[18px]">&rsaquo;</span>
          <span className="text-text-primary line-clamp-1">{course.title}</span>
        </div>
      </div>

      <main>
        <CourseHero course={course} />

        <div className="max-w-[1340px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 relative -mt-10 sm:-mt-12 z-10">
          <CourseInfoBar course={course} />
        </div>

        <div className="max-w-[1240px] 2xl:max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-8 sm:py-10 lg:py-12">
          <CourseTabs />

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <div className="max-w-[860px] space-y-8 sm:space-y-10 lg:space-y-12">
              <WhatYouWillLearn
                outcomes={course.outcomes}
                description={course.description}
              />
              <SkillsGain />
              <DetailsToKnow />
            </div>
          </div>
        </div>

        <div className="max-w-[1340px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 mt-8 sm:mt-10 lg:mt-12">
          <AdvanceExpertise thumbnailUrl={course.thumbnail} />
        </div>

        <div className="max-w-[1340px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-8 sm:py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
            <div className="flex-1 min-w-0 space-y-12">
              <CourseSeries courses={seriesCourses} />
            </div>
            <div className="w-full lg:w-[340px] shrink-0 lg:mt-[214px]">
              <CourseSeriesSideCard instructorName={course.instructor?.name} />
            </div>
          </div>
        </div>

        <div className="max-w-[1340px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pb-8 sm:pb-10 lg:pb-12">
          <CareerTestimonials />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;
