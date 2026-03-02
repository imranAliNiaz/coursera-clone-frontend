import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSearchResults } from "../../redux/slices/student/studentSearchSlice";
import type {
  SearchCourse,
  DurationBucket,
  MappedSearchResult,
} from "../../types/student";

const DURATION_OPTIONS: { label: string; value: DurationBucket }[] = [
  { label: "Under 60 Minutes", value: "under_60" },
  { label: "1-4 Weeks", value: "1_4_weeks" },
  { label: "1-3 Months", value: "1_3_months" },
  { label: "3-6 Months", value: "3_6_months" },
  { label: "Less Than 21 Hours", value: "under_21_hours" },
];

const matchesDurationBucket = (
  durationMinutes: number | null | undefined,
  bucket: DurationBucket,
) => {
  if (durationMinutes === undefined || durationMinutes === null) return false;
  switch (bucket) {
    case "under_60":
      return durationMinutes < 60;
    case "1_4_weeks":
      return (
        durationMinutes >= 7 * 24 * 60 && durationMinutes <= 4 * 7 * 24 * 60
      );
    case "1_3_months":
      return (
        durationMinutes >= 4 * 7 * 24 * 60 &&
        durationMinutes <= 12 * 7 * 24 * 60
      );
    case "3_6_months":
      return (
        durationMinutes >= 12 * 7 * 24 * 60 &&
        durationMinutes <= 24 * 7 * 24 * 60
      );
    case "under_21_hours":
      return durationMinutes < 21 * 60;
    default:
      return false;
  }
};

const increment = (map: Record<string, number>, key: string) => {
  map[key] = (map[key] || 0) + 1;
};

const buildCounts = (courses: SearchCourse[]) => {
  const counts = {
    subjects: {} as Record<string, number>,
    levels: {} as Record<string, number>,
    languages: {} as Record<string, number>,
    skills: {} as Record<string, number>,
    educators: {} as Record<string, number>,
    durations: {} as Record<string, number>,
  };

  courses.forEach((course) => {
    if (course.category) increment(counts.subjects, course.category);
    if (course.difficulty) increment(counts.levels, course.difficulty);
    if (course.language) increment(counts.languages, course.language);
    if (Array.isArray(course.skills)) {
      course.skills.forEach((skill) => {
        if (skill) increment(counts.skills, skill);
      });
    }
    if (course.instructor?.id)
      increment(counts.educators, course.instructor.id);
    DURATION_OPTIONS.forEach((bucket) => {
      if (matchesDurationBucket(course.durationMinutes, bucket.value)) {
        increment(counts.durations, bucket.value);
      }
    });
  });

  return counts;
};

const ensureSelectedOptions = (
  options: { label: string; value: string; count?: number }[],
  selected: string[],
  fallbackLabel = "Unknown",
) => {
  const existing = new Set(options.map((option) => option.value));
  const merged = [...options];
  selected.forEach((value) => {
    if (!existing.has(value)) {
      merged.push({ label: value || fallbackLabel, value, count: 0 });
    }
  });
  return merged;
};

const useSearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("search") || "";
  const dispatch = useAppDispatch();
  const { allCourses, loading: isLoading } = useAppSelector(
    (state) => state.studentSearch,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedEducators, setSelectedEducators] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleValue = (
    value: string,
    values: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value],
    );
  };

  useEffect(() => {
    setSelectedSubjects([]);
    setSelectedSkills([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedEducators([]);
    setSelectedLanguages([]);
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    dispatch(fetchSearchResults(query));
  }, [query, dispatch]);

  const filteredCourses = useMemo(() => {
    const selectedDurationBuckets = selectedDurations as DurationBucket[];
    return allCourses.filter((course) => {
      if (
        selectedSubjects.length > 0 &&
        (!course.category || !selectedSubjects.includes(course.category))
      )
        return false;
      if (
        selectedLevels.length > 0 &&
        (!course.difficulty || !selectedLevels.includes(course.difficulty))
      )
        return false;
      if (
        selectedLanguages.length > 0 &&
        (!course.language || !selectedLanguages.includes(course.language))
      )
        return false;
      if (selectedSkills.length > 0) {
        const courseSkills = Array.isArray(course.skills) ? course.skills : [];
        const matchesSkill = selectedSkills.some((skill) =>
          courseSkills.includes(skill),
        );
        if (!matchesSkill) return false;
      }
      if (selectedDurationBuckets.length > 0) {
        const matchesDuration = selectedDurationBuckets.some((bucket) =>
          matchesDurationBucket(course.durationMinutes, bucket),
        );
        if (!matchesDuration) return false;
      }
      if (
        selectedEducators.length > 0 &&
        (!course.instructor?.id ||
          !selectedEducators.includes(course.instructor.id))
      )
        return false;
      return true;
    });
  }, [
    allCourses,
    selectedSubjects,
    selectedLevels,
    selectedLanguages,
    selectedSkills,
    selectedDurations,
    selectedEducators,
  ]);

  const PAGE_SIZE = 10;
  const totalCourses = filteredCourses.length;
  const totalPages = Math.ceil(totalCourses / PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedSubjects,
    selectedSkills,
    selectedLevels,
    selectedDurations,
    selectedEducators,
    selectedLanguages,
  ]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const allCounts = useMemo(() => buildCounts(allCourses), [allCourses]);
  const filteredCounts = useMemo(
    () => buildCounts(filteredCourses),
    [filteredCourses],
  );

  const educatorLabels = useMemo(() => {
    const map = new Map<string, string>();
    allCourses.forEach((course) => {
      if (course.instructor?.id && course.instructor?.name) {
        map.set(course.instructor.id, course.instructor.name);
      }
    });
    return map;
  }, [allCourses]);

  const buildOptions = (
    all: Record<string, number>,
    filtered: Record<string, number>,
    labelOverrides?: Map<string, string>,
  ) => {
    const keys = Object.keys(all);
    const options = keys.map((value) => ({
      value,
      label: labelOverrides?.get(value) || value,
      count: filtered[value] || 0,
    }));
    options.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
    return options;
  };

  const subjectOptions = useMemo(
    () =>
      ensureSelectedOptions(
        buildOptions(allCounts.subjects, filteredCounts.subjects),
        selectedSubjects,
      ),
    [allCounts.subjects, filteredCounts.subjects, selectedSubjects],
  );

  const skillOptions = useMemo(
    () =>
      ensureSelectedOptions(
        buildOptions(allCounts.skills, filteredCounts.skills),
        selectedSkills,
      ),
    [allCounts.skills, filteredCounts.skills, selectedSkills],
  );

  const levelOptions = useMemo(
    () =>
      ensureSelectedOptions(
        buildOptions(allCounts.levels, filteredCounts.levels),
        selectedLevels,
      ),
    [allCounts.levels, filteredCounts.levels, selectedLevels],
  );

  const languageOptions = useMemo(
    () =>
      ensureSelectedOptions(
        buildOptions(allCounts.languages, filteredCounts.languages),
        selectedLanguages,
      ),
    [allCounts.languages, filteredCounts.languages, selectedLanguages],
  );

  const educatorOptions = useMemo(
    () =>
      ensureSelectedOptions(
        buildOptions(
          allCounts.educators,
          filteredCounts.educators,
          educatorLabels,
        ),
        selectedEducators,
        "Unknown Educator",
      ),
    [
      allCounts.educators,
      filteredCounts.educators,
      educatorLabels,
      selectedEducators,
    ],
  );

  const durationOptions = useMemo(() => {
    const options = DURATION_OPTIONS.map((option) => ({
      ...option,
      count: filteredCounts.durations[option.value] || 0,
    }));
    return ensureSelectedOptions(options, selectedDurations, "Custom Duration");
  }, [filteredCounts.durations, selectedDurations]);

  const pagedCourses = useMemo(() => {
    if (totalCourses === 0) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, currentPage, totalCourses]);

  const mappedResults: MappedSearchResult[] = useMemo(
    () =>
      pagedCourses.map((course) => ({
        id: course.id,
        image:
          course.thumbnail ||
          "https://images.unsplash.com/photo-1620712943543-bcc4628c6757?w=800&auto=format&fit=crop&q=60",
        partnerLogo:
          course.instructor?.avatarUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
        partnerName: course.instructor?.name || "Professional Instructor",
        title: course.title,
        skills:
          Array.isArray(course.skills) && course.skills.length > 0
            ? course.skills.join(", ")
            : course.outcomes || course.description.substring(0, 100) + "...",
        rating: 4.8,
        reviews: "1.2k",
        type: `${course.difficulty || "Beginner"} \u2022 Course`,
      })),
    [pagedCourses],
  );

  const hasQuery = query.trim().length > 0;

  return {
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
  };
};

export default useSearchResults;
