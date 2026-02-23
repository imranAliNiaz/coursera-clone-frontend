import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import type { HomeHeaderState } from "../../../types/ui/home.types";

const useHomeHeader = (): HomeHeaderState => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { signOut } = useGoogleAuth();

  const openAuth = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsAuthModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegister = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsRegisterModalOpen(true);
    setIsAuthModalOpen(false);
  };

  const switchToRegister = () => {
    setIsAuthModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    isUserMenuOpen,
    setIsUserMenuOpen,
    searchQuery,
    setSearchQuery,
    user,
    signOut,
    openAuth,
    openRegister,
    switchToRegister,
    switchToLogin,
    handleSearch,
  };
};

export default useHomeHeader;
