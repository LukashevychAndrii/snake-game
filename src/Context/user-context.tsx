import React from "react";
import { userReducer } from "../reducers/user-reducer";
import { SignIn } from "../firebase/functions/SignIn";
import { Auth_E, Auth_EP, Auth_N, Auth_NEP } from "../types/auth";
import { SignUp } from "../firebase/functions/SignUp";
import { SignOut } from "../firebase/functions/SignOut";
import { autoLogin } from "../firebase/functions/autoLogin";

export interface User {
  name: string;
  userUpdateName: ({ name }: Auth_N) => void;
  email: string;
  userUpdateEmail: ({ email }: Auth_E) => void;
  userSignUp: ({ name, email, password }: Auth_NEP) => void;
  userSignIn: ({ email, password }: Auth_EP) => void;
  userSignOut: () => void;
  connectToAcc: () => void;
  isAuth: boolean;
}

const user: User = {
  name: "",
  userUpdateName() {},
  email: "",
  userUpdateEmail() {},
  userSignIn() {},
  userSignUp() {},
  userSignOut() {},
  connectToAcc() {},
  isAuth: false,
};

export const UserContext = React.createContext<User>(user);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(userReducer, user);

  async function userSignUp({ name, email, password }: Auth_NEP) {
    await SignUp({ name, email, password, dispatch });
  }
  async function userSignIn({ email, password }: Auth_EP) {
    await SignIn({ email, password, dispatch });
  }

  async function userSignOut() {
    await SignOut({ dispatch });
  }

  async function userUpdateName({ name }: Auth_N) {
    dispatch({ type: "UPDATE_NAME", payload: { name } });
  }
  async function userUpdateEmail({ email }: Auth_E) {
    dispatch({ type: "UPDATE_EMAIL", payload: { email } });
  }

  async function connectToAcc() {
    autoLogin({ dispatch });
  }

  return (
    <UserContext.Provider
      value={{
        name: state.name,
        email: state.email,
        userUpdateName,
        userUpdateEmail,
        userSignIn,
        userSignOut,
        userSignUp,
        connectToAcc,
        isAuth: state.isAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
