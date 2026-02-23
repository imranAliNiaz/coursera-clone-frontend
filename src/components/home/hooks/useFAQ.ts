import { useState } from "react";
import type { FAQState } from "../../../types/ui/home.types";

const useFAQ = (): FAQState => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return { openIndex, toggleIndex };
};

export default useFAQ;
