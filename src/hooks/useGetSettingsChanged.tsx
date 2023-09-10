import React from "react";
import { BoardContext, BoardSettingsI } from "../Context/board-context";
import { SettingsContext } from "../Context/settings-context";

const useGetSettingsChanged = (): boolean => {
  const { boardSettings: boardSettings_g } = React.useContext(BoardContext);
  const { boardSettings } = React.useContext(SettingsContext);

  const [isEqual, setIsEqual] = React.useState(false);

  React.useEffect(() => {
    function areObjectsEqual(a: BoardSettingsI, b: BoardSettingsI) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      // Check if the number of keys is the same
      if (keysA.length !== keysB.length) {
        return false;
      }

      // Sort the keys
      keysA.sort();
      keysB.sort();

      // Check if the values of each key in obj1 are equal to the corresponding key in obj2
      for (let i = 0; i < keysA.length; i++) {
        const keyA = keysA[i];
        const keyB = keysB[i];
        if (
          keyA !== keyB ||
          a[keyA as keyof BoardSettingsI] !== b[keyB as keyof BoardSettingsI]
        ) {
          return false;
        }
      }

      // If all checks pass, the objects are equal
      return true;
    }

    // Check if the objects are equal when either of them changes
    const objectsAreEqual = areObjectsEqual(boardSettings_g, boardSettings);

    setIsEqual(objectsAreEqual);
  }, [boardSettings_g, boardSettings]);
  return isEqual;
};
export default useGetSettingsChanged;
