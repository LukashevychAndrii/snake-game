import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAction } from "../../reducers/user-reducer";
import { redirect } from "../../utils/redirect";

interface Params {
  email: string;
  password: string;
  dispatch: React.Dispatch<userAction>;
}

export async function SignIn({ email, password, dispatch }: Params) {
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.displayName && user.email) {
        dispatch({
          type: "CONNECT_TO_ACC",
          payload: { name: user.displayName, email: user.email },
        });
        redirect("/snake-game");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
