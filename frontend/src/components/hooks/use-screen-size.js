import { useEffect, useState } from "react";

const sizeOrder = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
};

class ComparableScreenSize {
  constructor(value) {
    this.value = value;
  }
  lessThan(other) {
    return sizeOrder[this.value] < sizeOrder[other];
  }
}

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("xs");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1536) setScreenSize("2xl");
      else if (w >= 1280) setScreenSize("xl");
      else if (w >= 1024) setScreenSize("lg");
      else if (w >= 768) setScreenSize("md");
      else if (w >= 640) setScreenSize("sm");
      else setScreenSize("xs");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return new ComparableScreenSize(screenSize);
};
