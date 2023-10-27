import React from "react";

export function useGetWindowWidth() {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth
  );

  React.useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth);
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}
