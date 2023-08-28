import React from "react";
import styles from "../../Setting.module.scss";
import { color } from "../../../../../types/color";

interface props {
  heading: string;
  variantType: string;
  getNewColor: (newColor: color) => void;
  currentColor: color;
}

const SettingsVariant2: React.FC<props> = ({
  heading,
  variantType,
  getNewColor,
  currentColor,
}) => {
  return (
    <div className={styles["settings__variant--2"]}>
      <div className={styles["settings__variant--2__heading"]}>{heading}</div>
      <form>
        <input
          style={{ cursor: "pointer" }}
          value={currentColor}
          onChange={(e) => {
            getNewColor(e.target.value as color);
          }}
          type="color"
          name={variantType}
          id={variantType}
        />
        <label htmlFor={variantType}></label>
      </form>
    </div>
  );
};

export default SettingsVariant2;
