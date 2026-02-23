import Header from "../../components/layout/Header";
import Footer from "../../components/home/Footer";
import { IMAGES } from "../../constants/images";
import useCourseCertificate from "./useCourseCertificate";

const CourseCertificate: React.FC = () => {
  const {
    certificate,
    loading,
    certificateImageUrl,
    learningPoints,
    formatCompletionDate,
    handleDownload,
    handleShare,
  } = useCourseCertificate();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-sans text-text-primary">
        <Header />
        <div className="max-w-[1140px] mx-auto px-4 md:px-12 py-8">
          <div className="animate-pulse">
            <div className="h-[12px] w-[220px] rounded bg-skeleton-bg mb-8" />
            <div className="h-[32px] w-[60%] rounded bg-skeleton-bg mb-10" />

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="space-y-10 min-w-0 flex-1 w-full max-w-[500px]">
                <div className="bg-certificate-banner-bg rounded-sm p-10 flex items-start gap-10">
                  <div className="w-[88px] h-[88px] rounded-full bg-certificate-skeleton-alt shrink-0" />
                  <div className="space-y-4 flex-1">
                    <div className="h-[20px] w-[70%] rounded bg-certificate-skeleton-alt" />
                    <div className="space-y-2">
                      <div className="h-[12px] w-[55%] rounded bg-certificate-skeleton-alt" />
                      <div className="h-[12px] w-[45%] rounded bg-certificate-skeleton-alt" />
                      <div className="h-[12px] w-[60%] rounded bg-certificate-skeleton-alt" />
                    </div>
                    <div className="h-[12px] w-[90%] rounded bg-certificate-skeleton-alt mt-4" />
                    <div className="h-[12px] w-[80%] rounded bg-certificate-skeleton-alt" />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <div className="w-[64px] h-[68px] rounded bg-skeleton-bg shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-[16px] w-[70%] rounded bg-skeleton-bg" />
                    <div className="h-[12px] w-[40%] rounded bg-skeleton-bg" />
                    <div className="h-[12px] w-[55%] rounded bg-skeleton-bg" />
                  </div>
                </div>

                <div className="bg-white rounded-sm border border-certificate-border-subtle p-10 space-y-10">
                  <div>
                    <div className="h-[14px] w-[180px] rounded bg-skeleton-bg mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={`learn-skeleton-${index}`}
                          className="flex gap-5"
                        >
                          <div className="w-[20px] h-[20px] rounded-full bg-skeleton-bg mt-1" />
                          <div className="h-[12px] w-full rounded bg-skeleton-bg" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-8 border-t border-certificate-skill-bg">
                    <div className="h-[14px] w-[200px] rounded bg-skeleton-bg" />
                    <div className="flex flex-wrap gap-2.5">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={`skill-skeleton-${index}`}
                          className="h-[32px] w-[120px] rounded-full bg-skeleton-bg"
                        />
                      ))}
                    </div>
                    <div className="h-[12px] w-[100px] rounded bg-skeleton-bg mt-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:sticky md:top-24 mt-10 md:mt-0 w-full max-w-[600px]">
                <div className="bg-white rounded border border-certificate-frame-border border-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
                  <div className="w-full h-[340px] bg-skeleton-bg" />
                </div>
                <div className="space-y-4 pt-2">
                  <div className="h-[48px] w-full rounded-[4px] bg-skeleton-bg" />
                  <div className="h-[48px] w-full rounded-[4px] bg-skeleton-bg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer simple />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary">
      <Header />

      <main className="max-w-[1140px] mx-auto  py-8">
        <nav className="flex items-center gap-1.5 text-[13px] text-certificate-text-muted mb-8 font-medium">
          <span className="hover:underline cursor-pointer">
            Accomplishments
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span className="text-text-primary">Course Certificate</span>
        </nav>

        <h1 className="text-[36px] font-normal mb-8 text-text-primary">
          {certificate?.courseTitle || "Course Certificate"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="space-y-10 min-w-0 flex-1 w-full max-w-[500px]">
            <div className="bg-certificate-banner-bg rounded-sm p-10 flex items-start gap-10">
              <div className="relative">
                <div className="w-[88px] h-[88px] rounded-full bg-certificate-avatar-bg flex items-center justify-center text-white text-[42px] font-bold shrink-0">
                  {(certificate?.learnerName || "L").charAt(0).toUpperCase()}
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-[26px] h-[26px] bg-white rounded-full flex items-center justify-center border border-certificate-badge-border">
                  <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-[24px] font-normal text-text-primary">
                  Completed by{" "}
                  <span className="font-bold">
                    {certificate?.learnerName || "Learner"}
                  </span>
                </h2>
                <div className="space-y-1.5 text-[15px] text-text-primary">
                  <p>
                    {formatCompletionDate(certificate?.issuedAt ?? undefined)}
                  </p>
                  <p>
                    {typeof certificate?.durationMinutes === "number" &&
                    certificate.durationMinutes > 0
                      ? certificate.durationMinutes < 60
                        ? `${certificate.durationMinutes} minutes (approximately)`
                        : `${certificate.durationHours} hours (approximately)`
                      : certificate?.durationHours
                        ? `${certificate.durationHours} hours (approximately)`
                        : "N/A"}
                  </p>
                  <p>
                    {typeof certificate?.grade === "number"
                      ? `Grade Achieved: ${certificate.grade.toFixed(2)}%`
                      : "Grade Achieved: N/A"}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed text-text-primary mt-4 max-w-[500px]">
                  <span className="font-bold">
                    {certificate?.learnerName || "This learner"}'s
                  </span>{" "}
                  account is verified. Coursera{" "}
                  <span className="font-bold text-primary">certifies</span>their{" "}
                  <span className="font-bold text-primary">
                    successful completion of
                  </span>{" "}
                  <span className="font-bold text-text-primary">
                    {certificate?.courseTitle || "this course"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <div className="w-[64px] h-[68px] shrink-0">
                <img
                  src={IMAGES.LOGOS.GOOGLE_LOGO}
                  alt="Google"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[20px] font-normal text-text-primary leading-tight mb-1">
                  {certificate?.courseTitle || "Course"}
                </h3>
                <p className="text-[14px] text-certificate-text-muted font-medium">
                  {certificate?.partnerName || "Provider"}
                </p>
                <div className="flex items-center gap-1.5 py-1">
                  <div className="flex text-certificate-star gap-[3px]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[14px] font-bold text-text-primary ml-0.5">
                    4.8
                  </span>
                  <span className="text-[14px] text-certificate-text-muted">
                    (74,715 ratings)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-certificate-border-subtle p-10 space-y-10">
              <div>
                <h3 className="text-[16px] font-normal tracking-widest uppercase text-text-primary mb-8">
                  WHAT YOU WILL LEARN
                </h3>
                {learningPoints.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    {learningPoints.map((point: string, index: number) => (
                      <div key={`${index}-${point}`} className="flex gap-5">
                        <div className="mt-1">
                          <svg
                            className="text-certificate-check"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <p className="text-[15px] leading-relaxed text-text-primary">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[15px] leading-relaxed text-text-primary">
                    Learning outcomes are not available for this course yet.
                  </p>
                )}
              </div>

              <div className="space-y-6 pt-8 border-t border-certificate-skill-bg">
                <h3 className="text-[16px] font-normal tracking-widest uppercase text-text-primary">
                  SKILLS YOU WILL GAIN
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "User Research",
                    "Usability",
                    "User Experience Design",
                    "Prototyping",
                    "Sprint Planning",
                    "User Interface (UI)",
                    "Sprint Retrospectives",
                    "Mockups",
                    "Wireframing",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-certificate-skill-bg rounded-full text-[14px] text-text-primary font-medium border border-transparent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="text-[14px] font-bold text-primary hover:underline uppercase tracking-widest mt-2">
                  SHOW ALL
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:sticky md:top-24 mt-10 md:mt-0 w-full max-w-[600px]">
            <div className="bg-white rounded  border border-certificate-frame-border border-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
              <img
                src={
                  certificateImageUrl ||
                  "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7.jpeg"
                }
                alt="Certificate"
                className="w-full h-auto max-h-[340px] "
              />
            </div>
            <div className="space-y-4 pt-2">
              <button
                onClick={handleShare}
                disabled={!certificate}
                className="w-full py-3.5 bg-primary text-white rounded-[4px] font-bold text-[15px] hover:bg-primary-hover transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share Certificate
              </button>
              <button
                onClick={handleDownload}
                disabled={!certificate}
                className="w-full py-3.5 border border-primary text-primary rounded-[4px] font-bold text-[15px] hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 bg-transparent disabled:opacity-60"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer simple />
    </div>
  );
};

export default CourseCertificate;
