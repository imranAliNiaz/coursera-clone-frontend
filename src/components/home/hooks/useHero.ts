import { useState } from "react";

const useHero = () => {
  const [showPromo, setShowPromo] = useState(false);
  return { showPromo, setShowPromo };
};

export default useHero;
