import { useEffect } from "react";

export default function useScrollCSSVariable() {
  useEffect(() => {
    const setCSSVars = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}`);
      document.documentElement.style.setProperty("--screen-height", `${window.innerHeight}`);
    };

    // Set initial values
    setCSSVars();

    // Add event listeners
    window.addEventListener("scroll", setCSSVars);
    window.addEventListener("resize", setCSSVars); // Keep screen height updated

    // Cleanup
    return () => {
      window.removeEventListener("scroll", setCSSVars);
      window.removeEventListener("resize", setCSSVars);
    };
  }, []);
}