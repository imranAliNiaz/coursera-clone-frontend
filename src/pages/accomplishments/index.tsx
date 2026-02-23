import React from "react";
import Header from "../../components/common/Header";
import { IMAGES } from "../../constants/images";
import UpNextCourseCard from "../../components/accomplishments/UpNextCourseCard";
import EarnDegreeCard from "../../components/accomplishments/EarnDegreeCard";
import MasterTrackCertificateCard from "../../components/accomplishments/MasterTrackCertificateCard";

import { useAccomplishments } from "./useAccomplishments";

const Accomplishments: React.FC = () => {
  const {
    certificateItems,
    topPickCourses,
    setTopPicksVisibleCount,
    recentlyViewedCourses,
    setRecentlyViewedVisibleCount,
    setDegreesVisibleCount,
    upNextCourses,
    activeCertificateTab,
    setActiveCertificateTab,
    studentName,
    completedCourseName,
    topPicksRemaining,
    degreesRemaining,
    showMoreDegrees,
    recentlyViewedRemaining,
    topPickRows,
    recentlyViewedRows,
    degreeRows,
    certificateRows,
    degreeItems,
  } = useAccomplishments();

  const contentContainer = "max-w-[1000px] mx-auto px-4 md:px-8";

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary overflow-x-hidden">
      <Header />

      <main className={`${contentContainer} py-8 sm:py-10 lg:py-12`}>
        <div className="border border-border rounded-[4px] p-6 mb-10">
          <h2 className="text-[20px] font-normal text-text-primary mb-2">
            Verify My ID
          </h2>
          <p className="text-[14px] text-text-primary leading-6">
            Your name, {studentName}, is verified. This is the name that will
            appear on your certificates. If you have questions or need help with
            your ID Verification, visit our{" "}
            <a href="#" className="text-primary hover:underline">
              ID Verification support
            </a>{" "}
            page.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-[16px] font-normal text-accomplishments-text-secondary mb-3">
            My Specializations
          </h2>
          <div className="border border-border rounded-[4px] bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
              <div className="w-[76px] h-[76px] border border-gray-200 bg-gray-50 rounded-[4px] flex items-center justify-center shrink-0">
                <img
                  src={IMAGES.UI.SPECIALIZATION_ICON}
                  alt="Specialization"
                  className="w-[44px] h-[44px] object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] text-primary font-medium mb-1">
                  Google Prompting Essentials
                </div>
                <div className="text-[14px] text-text-primary">Google</div>
              </div>
              <button className="ml-auto px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors">
                Add to LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-[16px] font-normal text-accomplishments-text-secondary mb-3">
            My Courses
          </h2>
          <div className="space-y-6">
            <div className="border border-border rounded-[4px] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                <div className="w-[76px] h-[76px] border border-[#e6f0ff] bg-[#f7fbff] rounded-[4px] flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.UI.SPECIALIZATION_ICON}
                    alt="Course"
                    className="w-[44px] h-[44px] object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] text-primary font-medium mb-1">
                    Design Prompts for Everyday Work Tasks
                  </div>
                  <div className="text-[14px] text-text-primary mb-1">
                    Google
                  </div>
                  <div className="text-[14px] text-text-primary">
                    Grade Achieved: 100%
                  </div>
                </div>
                <button className="ml-auto px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors">
                  Add to LinkedIn
                </button>
              </div>
            </div>

            <div className="border border-border rounded-[4px] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                <div className="w-[76px] h-[76px] border border-[#e6f0ff] bg-[#f7fbff] rounded-[4px] flex items-center justify-center shrink-0">
                  <img
                    src={IMAGES.UI.SPECIALIZATION_ICON}
                    alt="Course"
                    className="w-[44px] h-[44px] object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] text-primary font-medium mb-1">
                    Start Writing Prompts like a Pro
                  </div>
                  <div className="text-[14px] text-text-primary mb-1">
                    Google
                  </div>
                  <div className="text-[14px] text-text-primary">
                    Grade Achieved: 100%
                  </div>
                </div>
                <button className="ml-auto px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors">
                  Add to LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {certificateItems.length > 0 && (
          <div className="mb-16">
            <h2 className="text-[16px] font-normal text-accomplishments-text-secondary mb-3">
              My Certificates
            </h2>
            <div className="space-y-6">
              {certificateItems.map((cert) => (
                <div
                  key={cert.id}
                  className="border border-border rounded-[4px] bg-white"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
                    <div className="w-[76px] h-[76px] border border-[#e6f0ff] bg-[#f7fbff] rounded-[4px] overflow-hidden shrink-0">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[16px] text-primary font-medium mb-1">
                        {cert.title}
                      </div>
                      <div className="text-[14px] text-text-primary mb-1">
                        {cert.type}
                      </div>
                      {cert.grade && (
                        <div className="text-[14px] text-text-primary">
                          Grade Achieved: {cert.grade}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={`/accomplishments/certificate/${cert.id}`}
                        className="px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors text-center"
                      >
                        View Certificate
                      </a>
                      <button className="px-5 py-2 border border-accomplishments-btn-bg text-accomplishments-btn-bg text-[14px] font-medium rounded-[10px] hover:bg-[#f5f7f8] transition-colors">
                        Add to LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-text-primary mb-6">
            Up Next in {completedCourseName}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-stretch gap-4 sm:gap-0">
            {upNextCourses.map((course, index) => (
              <div
                key={`${course.title}-${index}`}
                className={`${index === 0 ? "" : "sm:-ml-8"} relative shrink-0`}
                style={{ zIndex: index + 1 }}
              >
                <UpNextCourseCard
                  title={course.title}
                  image={course.image || ""}
                  className="w-full sm:w-[260px] md:w-[240px] lg:w-[300px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-text-primary mb-6">
            Top Picks for You
          </h2>
          <div className="space-y-6">
            {topPickRows.map((row, rowIndex) => (
              <div
                key={`top-picks-row-${rowIndex}`}
                className="flex flex-col sm:flex-row sm:items-stretch gap-4 sm:gap-0"
              >
                {row.map((course, index) => (
                  <div
                    key={`${course.title}-${rowIndex}-${index}`}
                    className={`${index === 0 ? "" : "sm:-ml-8"} relative shrink-0`}
                    style={{ zIndex: index + 1 }}
                  >
                    <UpNextCourseCard
                      title={course.title}
                      image={course.image || ""}
                      className="w-full sm:w-[260px] md:w-[240px] lg:w-[300px]"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {topPicksRemaining > 0 ? (
            <button
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors"
              onClick={() => setTopPicksVisibleCount(topPickCourses.length)}
            >
              Show {topPicksRemaining} more
            </button>
          ) : null}
        </div>

        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-text-primary mb-6">
            Recently Viewed Products
          </h2>
          <div className="space-y-6">
            {recentlyViewedRows.map((row, rowIndex) => (
              <div
                key={`recently-viewed-row-${rowIndex}`}
                className="flex flex-col sm:flex-row sm:items-stretch gap-4 sm:gap-0"
              >
                {row.map((course, index) => (
                  <div
                    key={`${course.title}-${rowIndex}-${index}`}
                    className={`${index === 0 ? "" : "sm:-ml-8"} relative shrink-0`}
                    style={{ zIndex: index + 1 }}
                  >
                    <UpNextCourseCard
                      title={course.title}
                      image={course.image || ""}
                      className="w-full sm:w-[260px] md:w-[240px] lg:w-[300px]"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {recentlyViewedRemaining > 0 ? (
            <button
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors"
              onClick={() =>
                setRecentlyViewedVisibleCount(recentlyViewedCourses.length)
              }
            >
              Show {recentlyViewedRemaining} more
            </button>
          ) : null}
        </div>

        <div className="mb-16">
          <h2 className="text-[24px] font-semibold text-text-primary mb-6">
            Earn Your Degree
          </h2>
          <div className="space-y-6">
            {degreeRows.map((row, rowIndex) => (
              <div
                key={`degree-row-${rowIndex}`}
                className="flex flex-col sm:flex-row sm:items-stretch gap-4 sm:gap-0"
              >
                {row.map((degree, index) => (
                  <div
                    key={`${degree.degree}-${rowIndex}-${index}`}
                    className={`${index === 0 ? "" : "sm:-ml-8"} relative shrink-0`}
                    style={{ zIndex: index + 1 }}
                  >
                    <EarnDegreeCard
                      {...degree}
                      className="w-full sm:w-[260px] md:w-[240px] lg:w-[300px]"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {showMoreDegrees ? (
            <button
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors"
              onClick={() => setDegreesVisibleCount(degreeItems.length)}
            >
              Show {degreesRemaining} more
            </button>
          ) : null}
        </div>

        <div className="mb-16">
          <h2 className="text-[22px] font-normal text-text-primary mb-2">
            MasterTrack ® and University Certificates
          </h2>
          <p className="text-[14px] text-updates-text-muted mb-4">
            Earn an university-issued credential and credit towards a degree
          </p>

          <div className="flex items-center gap-3 mb-6">
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${
                activeCertificateTab === "mastertrack"
                  ? "bg-accomplishments-dark-surface text-white border-accomplishments-dark-surface"
                  : "bg-white text-accomplishments-dark-surface border-border hover:bg-[#f5f7f8]"
              }`}
              onClick={() => setActiveCertificateTab("mastertrack")}
            >
              MasterTrack ® Certificates
            </button>
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${
                activeCertificateTab === "university"
                  ? "bg-accomplishments-dark-surface text-white border-accomplishments-dark-surface"
                  : "bg-white text-accomplishments-dark-surface border-border hover:bg-[#f5f7f8]"
              }`}
              onClick={() => setActiveCertificateTab("university")}
            >
              University Certificates
            </button>
          </div>

          <div className="space-y-6">
            {certificateRows.map((row, rowIndex) => (
              <div
                key={`certificate-row-${rowIndex}`}
                className="flex flex-col sm:flex-row sm:items-stretch gap-4 sm:gap-0"
              >
                {row.map((item, index) => (
                  <div
                    key={`${item.title}-${rowIndex}-${index}`}
                    className={`${index === 0 ? "" : "sm:-ml-8"} relative shrink-0`}
                    style={{ zIndex: index + 1 }}
                  >
                    <div className="w-full sm:w-[260px] md:w-[240px] lg:w-[300px]">
                      <MasterTrackCertificateCard
                        title={item.title}
                        image={item.image}
                        university={item.university}
                        universityIcon={item.universityIcon}
                        typeLabel={
                          activeCertificateTab === "mastertrack"
                            ? "Mastertrack"
                            : "University Certificate"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accomplishments-accent-surface rounded-[8px] px-8 py-10 mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary text-[16px] font-medium tracking-wide">
                  coursera <span className="font-bold">PLUS</span>
                </span>
                <span className="w-[2px] h-[18px] bg-text-primary inline-block"></span>
              </div>

              <h3 className="text-[20px] text-text-primary font-normal leading-relaxed mb-4">
                Try out different courses to see which one fits your needs
              </h3>

              <p className="text-[14px] text-text-primary leading-6 mb-6 max-w-[420px]">
                Get a 7-day free trial that includes courses, Specializations,
                Projects, and Professional
              </p>

              <button className="bg-primary text-white text-[14px] font-medium px-6 py-3 rounded-[6px] flex items-center gap-2 hover:bg-[#0a4fb3] transition-colors">
                Learn More
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center md:justify-end relative">
              <img
                src={IMAGES.COURSERA_PLUS.IMAGE}
                alt="Coursera Plus"
                className="w-[220px] h-[220px] rounded-full object-cover"
              />
              <img
                src={IMAGES.COURSERA_PLUS.DOT}
                alt="Dots"
                className="absolute -bottom-2 right-4 w-[68px]"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-border py-12">
        <div className={contentContainer}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[14px]">
                Coursera
              </h3>
              <ul className="space-y-2 text-[12px] text-text-primary">
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    What We Offer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Catalog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Coursera Plus
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Professional Certificates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[14px]">
                Community
              </h3>
              <ul className="space-y-2 text-[12px] text-text-primary">
                <li>
                  <a href="#" className="hover:underline">
                    Learners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Beta Testers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Translators
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tech Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-4 text-[14px]">
                More
              </h3>
              <ul className="space-y-2 text-[12px] text-text-primary">
                <li>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Directory
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#1f1f1f] mb-4 text-[14px]">
                Mobile App
              </h3>
              <div className="flex flex-col gap-3">
                <a href="#">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/apple_store.svg?auto=format%2Ccompress&dpr=1&h=35"
                    alt="Download on the App Store"
                    className="h-[35px]"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/google_play.svg?auto=format%2Ccompress&dpr=1&h=35"
                    alt="Get it on Google Play"
                    className="h-[35px]"
                  />
                </a>
                <div className="mt-4">
                  <img
                    src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/footer/b-corp-logo.png?auto=format%2Ccompress&dpr=1&h=35"
                    alt="B Corp"
                    className="h-[50px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-border">
            <span className="text-[12px] text-[#5f6368]">
              © 2023 Coursera Inc. All rights reserved.
            </span>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="#" className="text-[#1f1f1f] hover:text-[#0056D2]">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Accomplishments;
