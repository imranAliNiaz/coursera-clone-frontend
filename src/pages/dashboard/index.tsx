import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import ContinueLearning from "../../components/dashboard/ContinueLearning";
import CourseSection from "../../components/dashboard/CourseSection";
import useDashboardData from "./useDashboardData";

const Dashboard: React.FC = () => {
  const { recentlyViewed, mostPopular, personalized, enrollments, isLoading } =
    useDashboardData();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main className="container mx-auto px-4 md:px-8 xl:px-10 2xl:px-12 py-10 max-w-[1440px] 2xl:max-w-[1680px]">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-[320px] shrink-0">
            <WelcomeHeader />
          </aside>

          <div className="flex-1">
            <ContinueLearning enrollments={enrollments} />

            <div className="mt-12">
              <CourseSection
                title="Recently Viewed Products"
                initialVisibleCount={3}
                columns={{ base: 1, md: 2, lg: 3 }}
                isLoading={isLoading}
                skeletonCount={3}
                courses={recentlyViewed.length > 0 ? recentlyViewed : []}
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <CourseSection
            title="Most Popular Certificates"
            initialVisibleCount={4}
            isLoading={isLoading}
            skeletonCount={4}
            courses={mostPopular.length > 0 ? mostPopular : []}
          />
          <CourseSection
            title="Personalized Specializations for You"
            initialVisibleCount={4}
            isLoading={isLoading}
            skeletonCount={4}
            courses={personalized.length > 0 ? personalized : []}
          />
        </div>
      </main>

      <Footer simple />
    </div>
  );
};

export default Dashboard;
