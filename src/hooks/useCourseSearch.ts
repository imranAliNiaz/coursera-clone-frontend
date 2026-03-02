import { useEffect, useRef, useState } from "react";
import { courseApi } from "../services/courseApi";
import type { SearchCourse } from "../types/student";

export const useCourseSearch = (navigate: (to: string) => void) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [results, setResults] = useState<SearchCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const popularSuggestions = [
    "Python",
    "Data Science",
    "React",
    "Business",
    "Machine Learning",
  ];

  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowOverlay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setError(null);
      setIsLoading(true);

      try {
        const response = await courseApi.searchCourses(searchQuery, 6);

        const publishedResults = (response.courses || []).filter(
          (c: SearchCourse) => c.status === "Published",
        );

        setResults(publishedResults);
        setShowOverlay(true);
        setSelectedIndex(-1);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Live search failed";
        setError(message);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowOverlay(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showOverlay) {
      if (e.key === "ArrowDown") {
        setShowOverlay(true);
        setSelectedIndex(0);
      }
      return;
    }

    const items = searchQuery.trim().length < 2 ? popularSuggestions : results;
    const maxIndex = items.length - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        e.preventDefault();

        if (searchQuery.trim().length < 2) {
          const suggestion = popularSuggestions[selectedIndex];
          setSearchQuery(suggestion);
          navigate(`/search?q=${encodeURIComponent(suggestion)}`);
          setShowOverlay(false);
        } else {
          const course = results[selectedIndex];
          if (course?.id) {
            navigate(`/course/${course.id}`);
            setShowOverlay(false);
            setSearchQuery("");
          }
        }
      } else {
        handleSearch(e);
      }
    } else if (e.key === "Escape") {
      setShowOverlay(false);
      inputRef.current?.blur();
    }
  };

  const selectSuggestion = (suggestion: string, index?: number) => {
    if (typeof index === "number") setSelectedIndex(index);
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowOverlay(false);
  };

  const selectCourse = (course: SearchCourse, index?: number) => {
    if (typeof index === "number") setSelectedIndex(index);
    if (course?.id) {
      navigate(`/course/${course.id}`);
      setShowOverlay(false);
      setSearchQuery("");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setSelectedIndex(-1);
    setError(null);
    inputRef.current?.focus();
  };

  return {
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
    error,
    handleSearch,
    handleKeyDown,
    selectSuggestion,
    selectCourse,
    clearSearch,
  };
};
