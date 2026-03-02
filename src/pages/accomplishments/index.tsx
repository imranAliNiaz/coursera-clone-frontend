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
              <button className="ml-auto px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors cursor-pointer">
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
                <button className="ml-auto px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors cursor-pointer">
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
                <button className="ml-auto px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors cursor-pointer">
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
                        className="px-5 py-2 bg-accomplishments-btn-bg text-white text-[14px] font-medium rounded-[10px] hover:bg-accomplishments-btn-hover transition-colors text-center cursor-pointer"
                      >
                        View Certificate
                      </a>
                      <button className="px-5 py-2 border border-accomplishments-btn-bg text-accomplishments-btn-bg text-[14px] font-medium rounded-[10px] hover:bg-[#f5f7f8] transition-colors cursor-pointer">
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
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors cursor-pointer"
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
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors cursor-pointer"
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
              className="mt-6 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-[#f5f7f8] transition-colors cursor-pointer"
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
              } cursor-pointer`}
              onClick={() => setActiveCertificateTab("mastertrack")}
            >
              MasterTrack ® Certificates
            </button>
            <button
              className={`px-4 py-2 rounded-[20px] text-[12px] font-medium border transition-colors ${
                activeCertificateTab === "university"
                  ? "bg-accomplishments-dark-surface text-white border-accomplishments-dark-surface"
                  : "bg-white text-accomplishments-dark-surface border-border hover:bg-[#f5f7f8]"
              } cursor-pointer`}
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

              <button className="bg-primary text-white text-[14px] font-medium px-6 py-3 rounded-[6px] flex items-center gap-2 hover:bg-[#0a4fb3] transition-colors cursor-pointer">
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
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
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
           
              <div className="flex flex-col items-start gap-6 ml-6">
                   <h3 className="font-bold text-[#1f1f1f]  text-[14px]">
                Mobile App
              </h3>
                <img
                  src={IMAGES.FOOTER.APPLE_STORE}
                  alt="Download on the App Store"
                  className="h-[56px] w-[187px] cursor-pointer"
                />
                <img
                  src={IMAGES.FOOTER.GOOGLE_PLAY}
                  alt="Get it on Google Play"
                  className="h-[56px] w-[187px] -ml-1 cursor-pointer"
                />
                <div className="flex flex-col items-center text-text-primary mt-2">
                  <span className="text-[18px] font-normal tracking-wide">
                    Certified
                  </span>
                  <img
                    src={IMAGES.FOOTER.B_ICON}
                    alt="B Corporation"
                    className="h-[52px] w-auto my-1 cursor-pointer"
                  />
                  <div className="h-1.5 w-[64px] bg-text-primary mb-1"></div>
                  <span className="text-[12px] font-medium tracking-wide">
                    Corporation
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border-muted pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-text-secondary text-[14px]">
              © 2025 Coursera Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-text-primary hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-text-primary hover:text-primary">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Accomplishments;
