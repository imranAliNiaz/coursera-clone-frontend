import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useProgramSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent, tag?: string) => {
    e?.preventDefault();
    const searchTerm = tag || query;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return { query, setQuery, handleSearch };
};

export default useProgramSearch;
