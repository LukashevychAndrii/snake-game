import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { userAction } from "../../reducers/user-reducer";
import { redirect } from "../../utils/redirect";

interface Params {
  name: string;
  email: string;
  password: string;
  dispatch: React.Dispatch<userAction>;
}

export async function SignUp({ name, email, password, dispatch }: Params) {
  const auth = getAuth();

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, { displayName: name });
      if (user.displayName && user.email) {
        dispatch({
          type: "CONNECT_TO_ACC",
          payload: { name: user.displayName, email: user.email },
        });
        redirect("/snake-game/");
      }
    })
    .catch((e) => {
      console.log(e.code);
      console.log(e.message);
    });
}
