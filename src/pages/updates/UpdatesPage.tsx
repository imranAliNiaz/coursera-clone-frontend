import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import { IMAGES } from "../../constants/images";
import Pagination from "../../components/search/Pagination";
import useUpdates from "./useUpdates";

const UpdatesPage: React.FC = () => {
  const {
    items,
    loading,
    now,
    currentPage,
    setCurrentPage,
    pageSize,
    skeletonCount,
    pageItems,
    totalPages,
    formatRelativeTime,
  } = useUpdates();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-8 xl:px-10 2xl:px-12 py-8 max-w-7xl 2xl:max-w-[1680px]">
        <h1 className="text-[22px] sm:text-[24px] md:text-[28px] font-bold text-text-primary mb-8 font-sans">
          Updates
        </h1>

        <div className="space-y-4">
          {loading &&
            Array.from({ length: skeletonCount }).map((_, index) => (
              <div
                key={`updates-skeleton-${index}`}
                className="flex flex-col sm:flex-row gap-3 sm:gap-6 p-6 rounded-lg border border-border bg-surface animate-pulse"
              >
                <div className="flex flex-col items-start sm:items-center sm:w-[92px]">
                  <div className="w-12 h-12 rounded-full bg-skeleton-bg" />
                  <div className="mt-2 h-[10px] w-[64px] rounded bg-skeleton-bg" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-[14px] w-[55%] rounded bg-skeleton-bg" />
                  <div className="h-[12px] w-[80%] rounded bg-skeleton-bg" />
                  <div className="h-[12px] w-[70%] rounded bg-skeleton-bg" />
                  <div className="h-[12px] w-[140px] rounded bg-skeleton-bg mt-1" />
                </div>
              </div>
            ))}
          {!loading && items.length === 0 && (
            <div className="text-[14px] text-updates-text-muted">
              No updates yet.
            </div>
          )}
          {pageItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 p-6 rounded-lg border border-border bg-surface"
            >
              <div className="flex flex-col items-start sm:items-center sm:w-[92px]">
                {item.type === "CERTIFICATE_READY" ? (
                  <img
                    src={IMAGES.UI.COURSERA_C_ICON}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center p-2">
                    <svg
                      className="w-full h-full text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                )}
                <span className="mt-2 text-[12px] text-updates-text-muted leading-tight">
                  {formatRelativeTime(item.createdAt, now)}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-[16px] font-bold text-text-primary leading-tight m-0">
                  {item.title}
                </h3>

                <p className="text-[14px] text-updates-text-message leading-relaxed mb-3 mt-1 max-w-full md:max-w-[90%]">
                  {item.message}
                </p>

                <div className="flex items-center">
                  <Link
                    to={item.link}
                    className="text-[14px] font-bold text-primary hover:underline no-underline"
                  >
                    {item.actionText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && items.length > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer simple />
    </div>
  );
};

export default UpdatesPage;
