import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userAction } from "../../reducers/user-reducer";

interface Params {
  dispatch: React.Dispatch<userAction>;
}

export async function autoLogin({ dispatch }: Params) {
  const auth = getAuth();
  await onAuthStateChanged(auth, (user) => {
    if (user?.displayName && user.email) {
      dispatch({
        type: "CONNECT_TO_ACC",
        payload: { name: user.displayName, email: user.email },
      });
    }
  });
}
