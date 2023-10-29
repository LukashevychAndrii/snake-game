import React from "react";

const useGetDeviceType = () => {
  const [isTouchDevice] = React.useState(
    !window.matchMedia("(hover: hover)").matches
  );

  return isTouchDevice;
};

export default useGetDeviceType;
