"use client";

import { PacmanLoader } from "react-spinners";
import { useTheme } from "next-themes";

const PLoader = () => {
  const { theme } = useTheme();
  const loaderColor = theme === "dark" ? "#00cccc" : "#ff5c61";

  return (
    <div className="w-full flex justify-center items-center py-5">
      <PacmanLoader color={loaderColor} />
    </div>
  );
};

export default PLoader;
