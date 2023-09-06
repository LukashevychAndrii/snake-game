import React from "react";
import styles from "../../Setting.module.scss";

import { ReactComponent as ChevronDown } from "../../../../imgs/SVG/chevron-down.svg";
import { useClickOutsideVariants } from "../../../../hooks/useClickOutsideVariants";
import { boardSize } from "../../../../types/boardSize";
import { boardSnakeSpeed } from "../../../../types/boardSnakeSpeed";

interface props {
  heading: string;
  variantType: string;
  options: React.ReactNode;
  currentValue: boardSize | boardSnakeSpeed;
}

const SettingsVariant1: React.FC<props> = ({
  heading,
  options,
  variantType,
  currentValue,
}) => {
  const [checked, setChecked] = React.useState(false);
  const ref = React.useRef(null);
  const labelRef = React.useRef(null);

  const outside = useClickOutsideVariants(ref, labelRef);
  React.useEffect(() => {
    setChecked(!outside);
  }, [outside, checked]);

  return (
    <div className={styles["settings__variant--1"]}>
      <div className={styles["settings__variant--1__heading"]}>{heading}</div>
      <form ref={ref} id={variantType}>
        <input
          checked={checked}
          onChange={() => setChecked(!checked)}
          type="checkbox"
          name={variantType}
          id={variantType}
        />
        <label
          ref={labelRef}
          onClick={() => setChecked(false)}
          htmlFor={variantType}
        >
          <div>{currentValue}</div>
          <ChevronDown
            className={styles["settings__variant--1__chevron-down"]}
          />
        </label>
        {options}
      </form>
    </div>
  );
};

export default SettingsVariant1;
