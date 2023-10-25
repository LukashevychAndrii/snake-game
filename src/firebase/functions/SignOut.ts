import { getAuth, signOut } from "firebase/auth";
import { userAction } from "../../reducers/user-reducer";
import { redirect } from "../../utils/redirect";

interface Params {
  dispatch: React.Dispatch<userAction>;
}

export async function SignOut({ dispatch }: Params) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch({ type: "DISCONNECT_FROM_ACC", payload: null });
      redirect("/snake-game/");
    })
    .catch((e) => {
      console.log(e.code);
      console.log(e.message);
    });
}
