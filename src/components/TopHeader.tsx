import { useEffect, useState } from "react";
import SearchYourPage from "./SearchYourPage";

export default function TopHeader() {
  const [hasShadow, setHasShadow] = useState(false);

  const handleScroll = () => {
    const scrollThreshold = 100; // Change this value to your desired height
    setHasShadow(window.scrollY > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div
    className={`fixed z-10 pl-4 top-0 left-[254px] h-[85px] w-full flex justify-start items-center bg-[#fafafa] ${hasShadow ? "shadow-md" : ""
      }`}
  >
    <SearchYourPage />
  </div>
}