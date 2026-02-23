import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import FilterSidebar from "../../components/search/FilterSidebar";
import SearchCourseCard from "../../components/search/SearchCourseCard";
import Pagination from "../../components/search/Pagination";
import { Link } from "react-router-dom";
import useSearchResults from "./useSearchResults";

const SearchResults: React.FC = () => {
  const {
    query,
    hasQuery,
    isLoading,
    currentPage,
    setCurrentPage,
    totalCourses,
    totalPages,
    selectedSubjects,
    setSelectedSubjects,
    selectedSkills,
    setSelectedSkills,
    selectedLevels,
    setSelectedLevels,
    selectedDurations,
    setSelectedDurations,
    selectedEducators,
    setSelectedEducators,
    selectedLanguages,
    setSelectedLanguages,
    subjectOptions,
    skillOptions,
    levelOptions,
    durationOptions,
    educatorOptions,
    languageOptions,
    toggleValue,
    mappedResults,
    PAGE_SIZE,
  } = useSearchResults();

  return (
    <div className="min-h-screen bg-surface font-sans">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center gap-2 mb-4 text-[13px] text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>
          <span className="text-text-muted text-[18px] font-light">
            &rsaquo;
          </span>
          <Link
            to="/google-career-certificates"
            className="hover:text-primary transition-colors"
          >
            Google Career Certificates - DAT
          </Link>
          <span className="text-text-muted text-[18px] font-light">
            &rsaquo;
          </span>
          <Link
            to="/results"
            className="hover:text-primary transition-colors text-primary"
          >
            Results
          </Link>
          <span className="text-text-muted text-[18px] font-light">
            &rsaquo;
          </span>
          <span className="text-text-primary">Search</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-[80px]">
              <FilterSidebar
                subjects={selectedSubjects}
                skills={selectedSkills}
                levels={selectedLevels}
                durations={selectedDurations}
                subjectOptions={subjectOptions}
                skillOptions={skillOptions}
                levelOptions={levelOptions}
                durationOptions={durationOptions}
                educatorOptions={educatorOptions}
                selectedEducators={selectedEducators}
                languages={selectedLanguages}
                languageOptions={languageOptions}
                onToggleSubject={(value) =>
                  toggleValue(value, selectedSubjects, setSelectedSubjects)
                }
                onToggleSkill={(value) =>
                  toggleValue(value, selectedSkills, setSelectedSkills)
                }
                onToggleLevel={(value) =>
                  toggleValue(value, selectedLevels, setSelectedLevels)
                }
                onToggleDuration={(value) =>
                  toggleValue(value, selectedDurations, setSelectedDurations)
                }
                onToggleEducator={(value) =>
                  toggleValue(value, selectedEducators, setSelectedEducators)
                }
                onToggleLanguage={(value) =>
                  toggleValue(value, selectedLanguages, setSelectedLanguages)
                }
              />
            </div>
          </aside>

          <section className="flex-1">
            <h1 className="text-[20px] font-bold text-text-primary mb-8 font-sans">
              {isLoading
                ? "Searching..."
                : totalCourses > 0
                  ? hasQuery
                    ? `Results for "${query}"`
                    : "All Courses"
                  : hasQuery
                    ? `No results found for "${query}"`
                    : "No courses available"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {!isLoading &&
                mappedResults.map((course, index) => (
                  <SearchCourseCard key={course.id || index} {...course} />
                ))}
            </div>

            {totalCourses >= PAGE_SIZE && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.max(totalPages, 1)}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
