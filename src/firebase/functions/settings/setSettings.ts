import { getDatabase, ref, set } from "firebase/database";
import { BoardSettingsI } from "../../../Context/board-context";
import { getAuth } from "firebase/auth";

interface Params {
  newBoardSettings: BoardSettingsI;
}

export const setSettings = async ({ newBoardSettings }: Params) => {
  const db = getDatabase();
  const auth = getAuth();
  const ID = auth.currentUser?.uid;
  if (ID) {
    const dbRef = ref(db, `${ID}/settings`);

    await set(dbRef, newBoardSettings).catch((e) => {
      console.log(e);
    });
  }
};
