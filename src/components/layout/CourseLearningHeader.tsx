import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import type { RootState } from "../../redux/store";
import { IMAGES } from "../../constants/images";
import { getAvatarColor, getInitials } from "../../utils/avatarUtils";
import NotificationsBell from "./NotificationsBell";
import { useCourseSearch } from "../../hooks/useCourseSearch";
import CourseSearchOverlay from "../search/CourseSearchOverlay";

const CourseLearningHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { signOut } = useGoogleAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  const handleOverlaySearch = (e?: React.FormEvent) => {
    handleSearch(e);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-[#e1e1e1] h-[64px] flex items-center sticky top-0 z-50 font-sans shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 shrink-0">
          <button className="text-[#1f1f1f] p-2 rounded-md hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            </svg>
          </button>

          <Link to="/" className="flex items-center no-underline">
            <img
              src={IMAGES.LOGO}
              alt="Coursera"
              className="h-[24px] w-auto object-contain"
            />
          </Link>

          <div className="h-[32px] w-[1px] bg-[#dadce0] mx-0"></div>

          <div className="w-10 h-10 rounded-full bg-[#00255d] flex items-center justify-center text-white font-bold text-[18px]">
            P
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-[680px] justify-start ml-6 mr-6">
          <form
            onSubmit={handleOverlaySearch}
            className="flex w-full items-center h-[40px] relative"
          >
            <div className="flex-1 h-full relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowOverlay(true)}
                placeholder="Search courses"
                className="w-full h-full border border-[#757575] border-r-0 rounded-l-[4px] px-3 text-[14px] text-[#1f1f1f] placeholder:text-[#5f6368] focus:outline-none focus:border-[#0056D2] z-10"
              />
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
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-3 h-full bg-white border border-mylearning-border-default border-l-0 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Clear search"
              >
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
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="px-6 h-full bg-primary text-white border border-primary rounded-r-[4px] font-semibold text-[14px] hover:bg-primary-dark transition-colors cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button className="text-text-secondary hover:text-text-primary bg-transparent border-none cursor-pointer p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>

          <NotificationsBell />

          <img
            src={IMAGES.UI.CARTOON_ICON}
            alt="Cartoon"
            className="w-8 h-8 rounded-3xl object-contain cursor-pointer"
          />

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[15px] focus:outline-none border-none cursor-pointer overflow-hidden p-0"
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
            </button>

            {isUserMenuOpen && (
              <>
                <div className="absolute right-0 mt-3 w-[250px] bg-white rounded-[4px] shadow-lg border border-mylearning-border-muted py-2 z-50">
                  <div className="px-4 py-3 border-b border-mylearning-border-muted">
                    <p className="font-bold text-text-primary truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  {[
                    {
                      label: "My Courses",
                      action: () => navigate("/my-learning"),
                    },
                    { label: "Profile", action: () => navigate("/profile") },
                    {
                      label: "Settings",
                      action: () => navigate("/account/settings"),
                    },
                    { label: "Updates", action: () => navigate("/updates") },
                    {
                      label: "Accomplishments",
                      action: () => navigate("/accomplishments"),
                    },
                    { label: "Log Out", action: handleLogout },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (item.action) item.action();
                      }}
                      className="w-full text-left px-4 py-2 text-[14px] text-text-primary hover:bg-surface transition-colors border-none bg-transparent cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseLearningHeader;
