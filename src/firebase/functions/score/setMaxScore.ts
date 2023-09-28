import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export async function setMaxScore(newTotalScore: number) {
  const auth = getAuth();

  if (auth) {
    const ID = auth.currentUser?.uid;
    const db = getDatabase();
    const dbRef = ref(db, `${ID}/score/maxScore`);
    await set(dbRef, newTotalScore);
  }
}
