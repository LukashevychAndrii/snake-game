import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { initialBoardSettingsState } from "../../../Context/settings-context";

export async function setDefaultSettings() {
  const auth = getAuth();

  if (auth.currentUser) {
    const ID = auth.currentUser.uid;
    const db = getDatabase();
    const dbRef = ref(db, `${ID}/settings`);
    const defaultSettings = initialBoardSettingsState.boardSettings;
    set(dbRef, defaultSettings);
  }
}
