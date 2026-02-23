import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { certificateApi } from "../../services/certificateApi";
import { courseApi } from "../../services/courseApi";
import { IMAGES } from "../../constants/images";
import type {
  CertificateApiItem,
  CertificateItem,
  TopPickCourse,
  RecentlyViewedCourse,
  UpNextCourse,
  SearchCourse,
} from "../../types/student";

interface CourseListItem extends SearchCourse {
  partner?: string | null;
  partnerLogo?: string | null;
  type?: string | null;
}

export const useAccomplishments = () => {
  const [certificateItems, setCertificateItems] = useState<CertificateItem[]>(
    [],
  );
  const [topPickCourses, setTopPickCourses] = useState<TopPickCourse[]>([]);
  const [topPicksVisibleCount, setTopPicksVisibleCount] = useState(4);
  const [topPicksPerRow, setTopPicksPerRow] = useState(4);
  const [recentlyViewedCourses, setRecentlyViewedCourses] = useState<
    RecentlyViewedCourse[]
  >([]);
  const [recentlyViewedVisibleCount, setRecentlyViewedVisibleCount] =
    useState(4);
  const [degreesVisibleCount, setDegreesVisibleCount] = useState(4);
  const [upNextCourses, setUpNextCourses] = useState<UpNextCourse[]>([]);
  const [activeCertificateTab, setActiveCertificateTab] = useState<
    "mastertrack" | "university"
  >("mastertrack");

  const { user } = useSelector((state: RootState) => state.auth);
  const studentName = user?.name || "Learner";
  const completedCourseName =
    certificateItems[0]?.title || "Google Prompting Essentials Specialization";

  const topPicksRemaining = topPickCourses.length - topPicksVisibleCount;

  const degreeItems = [
    {
      university: "University of Illinois Tech",
      degree: "Master of Science in Management (IMSM)",
      image: IMAGES.DEGREE.DEGREE_1,
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      university: "University of Hunders",
      degree: "MSc Management",
      image: IMAGES.DEGREE.HUNDERS,
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      university: "Illinois Tech",
      degree: "Master of Bussiness Administration",
      image: IMAGES.DEGREE.ILLINOIS_TECH,
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
    {
      university: "Illinois Tech",
      degree: "Master of Data Science",
      image: IMAGES.DEGREE.DEGREE_2,
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];
  const degreesRemaining = degreeItems.length - degreesVisibleCount;
  const showMoreDegrees = degreesRemaining > 0;

  const masterTrackCertificates = [
    {
      title: "Diplomado en Analítica de los Negocios",
      image: IMAGES.MASTERTRACK.MT1,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Administración de Empresas: Certificado MasterTrack",
      image: IMAGES.MASTERTRACK.MT2,
      university: "Universidad de P",
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      title: "Certificado en Finanzas Corporativas MasterTrack",
      image: IMAGES.MASTERTRACK.MT3,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Instructional Design MasterTrack Certificate",
      image: IMAGES.MASTERTRACK.MT4,
      university: "University of Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const universityCertificates = [
    {
      title: "Data Visualization and Communication Certificate",
      image: IMAGES.MASTERTRACK.MT1,
      university: "University of Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
    {
      title: "Strategic Management Certificate",
      image: IMAGES.MASTERTRACK.MT2,
      university: "University of Hunders",
      universityIcon: IMAGES.EARN_DEGREE.ICON_2,
    },
    {
      title: "Applied Business Analytics Certificate",
      image: IMAGES.MASTERTRACK.MT3,
      university: "Pontificia Universidad",
      universityIcon: IMAGES.EARN_DEGREE.ICON_1,
    },
    {
      title: "Digital Leadership Certificate",
      image: IMAGES.MASTERTRACK.MT4,
      university: "Illinois Tech",
      universityIcon: IMAGES.EARN_DEGREE.ICON_3,
    },
  ];

  const certificateDisplayItems =
    activeCertificateTab === "mastertrack"
      ? masterTrackCertificates
      : universityCertificates;

  const topPickRows = Array.from(
    { length: Math.ceil(topPicksVisibleCount / topPicksPerRow) },
    (_, rowIndex) =>
      topPickCourses.slice(
        rowIndex * topPicksPerRow,
        rowIndex * topPicksPerRow + topPicksPerRow,
      ),
  );

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certs = (await certificateApi.getMyCertificates()) as
          | CertificateApiItem[]
          | undefined;
        const items = (certs || []).map((c) => ({
          id: c.id,
          title: c.courseTitle || "Certificate",
          type: c.partnerName || c.course?.instructor?.name || "Course",
          image:
            c.imageUrl ||
            c.course?.thumbnail ||
            "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7/CERTIFICATE_LANDING_PAGE~2J3W9X4YK5Z7.jpeg",
          grade:
            typeof c.grade === "number" ? `${c.grade.toFixed(2)}%` : undefined,
        }));
        setCertificateItems(items);
      } catch (err) {
        toast.error("Failed to fetch certificates");
      }
    };
    fetchCertificates();
  }, []);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const result = await courseApi.getCourses({ limit: 100 });
        const courses = (result?.courses || []) as CourseListItem[];
        const formatted = courses.map((course) => ({
          title: course.title,
          provider: course.partner || course.instructor?.name || "Google",
          image: course.thumbnail,
          logo: course.partnerLogo || IMAGES.LOGOS.GOOGLE_LOGO,
          type: course.type || "Course",
        }));
        setTopPickCourses(formatted);
      } catch (err) {
        toast.error("Failed to fetch top picks");
      }
    };
    fetchTopPicks();
  }, []);

  useEffect(() => {
    const updateTopPicksPerRow = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width >= 1280) {
        setTopPicksPerRow(4);
      } else if (width >= 768) {
        setTopPicksPerRow(3);
      } else {
        setTopPicksPerRow(1);
      }
    };

    updateTopPicksPerRow();
    window.addEventListener("resize", updateTopPicksPerRow);
    return () => window.removeEventListener("resize", updateTopPicksPerRow);
  }, []);

  useEffect(() => {
    const fetchUpNextCourses = async () => {
      try {
        const result = await courseApi.getCourses({ limit: 100 });
        const courses = (result?.courses || []) as CourseListItem[];
        const filtered = courses.filter(
          (course) => course.title !== completedCourseName,
        );
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3).map((course) => ({
          title: course.title,
          image: course.thumbnail,
        }));
        setUpNextCourses(selected);
      } catch (err) {
        toast.error("Failed to fetch up next courses");
      }
    };
    fetchUpNextCourses();
  }, [completedCourseName]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const recentlyViewedData =
          (await courseApi.getRecentlyViewed()) as SearchCourse[];
        const formatted = recentlyViewedData.map((course, index: number) => ({
          title: course.title,
          provider: "Google",
          image: course.thumbnail,
          logo: IMAGES.LOGOS.GOOGLE_LOGO,
          badge: "Free Trial",
          type: index < 2 ? "Specialization" : "Professional Certificate",
        }));
        setRecentlyViewedCourses(formatted);
      } catch (err) {
        toast.error("Failed to fetch recently viewed courses");
      }
    };
    fetchRecentlyViewed();
  }, []);

  const recentlyViewedRemaining =
    recentlyViewedCourses.length - recentlyViewedVisibleCount;
  const recentlyViewedRows = Array.from(
    { length: Math.ceil(recentlyViewedVisibleCount / topPicksPerRow) },
    (_, rowIndex) =>
      recentlyViewedCourses.slice(
        rowIndex * topPicksPerRow,
        rowIndex * topPicksPerRow + topPicksPerRow,
      ),
  );

  const degreeRows = Array.from(
    { length: Math.ceil(degreesVisibleCount / topPicksPerRow) },
    (_, rowIndex) =>
      degreeItems.slice(
        rowIndex * topPicksPerRow,
        rowIndex * topPicksPerRow + topPicksPerRow,
      ),
  );

  const certificateRows = Array.from(
    { length: Math.ceil(certificateDisplayItems.length / topPicksPerRow) },
    (_, rowIndex) =>
      certificateDisplayItems.slice(
        rowIndex * topPicksPerRow,
        rowIndex * topPicksPerRow + topPicksPerRow,
      ),
  );

  return {
    certificateItems,
    topPickCourses,
    topPicksVisibleCount,
    setTopPicksVisibleCount,
    recentlyViewedCourses,
    recentlyViewedVisibleCount,
    setRecentlyViewedVisibleCount,
    degreesVisibleCount,
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
  };
};
