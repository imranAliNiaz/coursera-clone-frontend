import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import NotificationsBell from "./NotificationsBell";
import { useCourseSearch } from "../../hooks/useCourseSearch";
import CourseSearchOverlay from "../search/CourseSearchOverlay";

const ProfileHeader: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    searchQuery,
    setSearchQuery,
    showOverlay,
    setShowOverlay,
    results,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    popularSuggestions,
    overlayRef,
    inputRef,
    handleSearch,
    handleKeyDown,
    selectSuggestion,
    selectCourse,
    clearSearch,
  } = useCourseSearch(navigate);

  const displayName = user?.name || "User";
  const avatarUrl = user?.avatarUrl;

  return (
    <header className="bg-white border-b border-border h-[64px] flex items-center sticky top-0 z-50 font-sans">
      <div className="w-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 shrink-0">
          <button className="text-text-primary hover:bg-gray-50 p-2 rounded-md transition-colors border-none bg-transparent cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="4" cy="4" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="4" r="2" />
              <circle cx="4" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="4" cy="20" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="20" cy="20" r="2" />
            </svg>
          </button>
          <Link to="/" className="shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
          </Link>
        </div>

        <div className="flex-1 max-w-[620px] mx-10 hidden md:block">
          <form
            onSubmit={(e) => handleSearch(e)}
            className="relative flex items-center h-[44px] bg-white border border-profile-input-border rounded-full px-1 hover:border-text-secondary focus-within:border-primary transition-colors"
          >
            <div
              className="ml-[2px] w-[36px] h-[36px] rounded-full flex items-center justify-center text-white font-bold text-[17px] shrink-0"
              style={{ backgroundColor: "var(--color-profile-link-blue)" }}
            >
              C
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Coursera for Google Career Certificates - UX - Pro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowOverlay(true)}
              className="flex-1 px-4 bg-transparent border-none text-[14px] text-text-primary focus:outline-none placeholder:text-text-muted"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-text-muted shrink-0 hover:bg-gray-100 transition-colors border-none cursor-pointer"
                aria-label="Clear search"
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
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 hover:bg-primary-hover transition-colors border-none cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <CourseSearchOverlay
              show={showOverlay}
              overlayRef={overlayRef}
              searchQuery={searchQuery}
              isLoading={isLoading}
              popularSuggestions={popularSuggestions}
              results={results}
              selectedIndex={selectedIndex}
              onSelectSuggestion={selectSuggestion}
              onSelectCourse={selectCourse}
              onHover={setSelectedIndex}
              onSeeAll={() => handleSearch()}
            />
          </form>
        </div>

        <div className="flex items-center gap-6 shrink-0 mr-2">
          <button className="text-text-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>
          <NotificationsBell />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm cursor-pointer overflow-hidden"
            style={{ backgroundColor: getAvatarColor(displayName) }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="leading-none">{getInitials(displayName)}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
