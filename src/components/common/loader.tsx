"use client";

import { PuffLoader } from "react-spinners";
import { useTheme } from "next-themes";

const Loader = () => {
  const { theme } = useTheme();
  const loaderColor = theme === "dark" ? "#00cccc" : "#ff5c61";

  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader size={100} color={loaderColor} />
    </div>
  );
};

export default Loader;
