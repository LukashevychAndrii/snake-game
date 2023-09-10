import { getAuth } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { BoardSettingsI } from "../../../Context/board-context";

export async function fetchBoardSettings() {
  const auth = getAuth();

  if (auth && auth.currentUser) {
    const ID = auth.currentUser.uid;
    const db = getDatabase();
    const dbRef = ref(db, `${ID}/settings`);
    const s = await get(dbRef);

    if (s.exists()) {
      const settings = s.val() as BoardSettingsI;

      return settings;
    } else return null;
  } else return null;
}
