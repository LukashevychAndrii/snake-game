import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { userAction } from "../../reducers/user-reducer";
import { redirect } from "../../utils/redirect";
import { FirebaseError } from "firebase/app";
import { setDefaultSettings } from "./settings/setDefaultSettings";

interface Params {
  name: string;
  email: string;
  password: string;
  dispatch: React.Dispatch<userAction>;
}

export async function SignUp({ name, email, password, dispatch }: Params) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await updateProfile(user, { displayName: name });

    if (user.displayName && user.email) {
      dispatch({
        type: "CONNECT_TO_ACC",
        payload: { name: user.displayName, email: user.email },
      });

      await setDefaultSettings();
      redirect("/snake-game");
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.message);
      console.log(error.code);
    } else {
      console.log(error);
    }
  }
}
