import { getAuth } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";

export async function getScoreMax(): Promise<number | undefined> {
  const auth = getAuth();
  if (auth) {
    const db = getDatabase();
    const ID = auth.currentUser?.uid;
    const dbRef = ref(db, `${ID}/score/maxScore`);
    const r = await get(dbRef);
    if (r.exists()) {
      return r.val() as number;
    }
  }
}
