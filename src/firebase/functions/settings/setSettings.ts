import { getDatabase, ref, set } from "firebase/database";
import { BoardSettingsI } from "../../../Context/board-context";
import { boardAction } from "../../../reducers/board-reducer";
import { getAuth } from "firebase/auth";

interface Params {
  dispatch: React.Dispatch<boardAction>;
  newBoardSettings: BoardSettingsI;
}

export const setSettings = async ({ dispatch, newBoardSettings }: Params) => {
  const db = getDatabase();
  const auth = getAuth();
  const ID = auth.currentUser?.uid;
  if (ID) {
    const dbRef = ref(db, `${ID}/settings`);

    await set(dbRef, newBoardSettings).catch((e) => {
      console.log(e);
    });

    dispatch({ type: "SET_BOARD_SETTINGS", payload: newBoardSettings });
  }
};
