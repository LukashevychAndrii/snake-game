import React from "react";
import styles from "./AuthForm.module.scss";
import {
  authFormReducer,
  authFormReducerInitialState,
} from "./authForm-reducer";
import { UserContext } from "../../../Context/user-context";
import { redirect } from "../../../utils/redirect";

interface Props {
  current: "sign-in" | "sign-up";
}

const AuthForm: React.FC<Props> = ({ current }) => {
  const [state, dispatch] = React.useReducer(
    authFormReducer,
    authFormReducerInitialState
  );

  function userNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim().length < 4) {
      dispatch({
        type: "SET_NAME_ERROR",
        payload: "Min length of userName is 4!",
      });
    } else if (e.target.value.trim().length > 10) {
      dispatch({
        type: "SET_NAME_ERROR",
        payload: "Max length of userName is 10!",
      });
      return;
    } else {
      dispatch({
        type: "SET_NAME_ERROR",
        payload: "",
      });
    }
    dispatch({ type: "SET_NAME", payload: e.target.value });
  }

  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(e.target.value)) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: "Please enter a valid  email!",
      });
    } else if (e.target.value.trim().length > 30) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "Email is too long!" });
      return;
    } else {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "" });
    }
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  }

  function passChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim().length < 6) {
      dispatch({
        type: "SET_PASSWORD_ERROR",
        payload: "Min length of password is 6!",
      });
    } else if (e.target.value.trim().length > 20) {
      dispatch({
        type: "SET_PASSWORD_ERROR",
        payload: "Max length of password is 20!",
      });
      return;
    } else {
      dispatch({ type: "SET_PASSWORD_ERROR", payload: "" });
    }
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    const target = e.target;
    switch (target.name) {
      case "user_name":
        dispatch({ type: "SET_NAME_TOUCHED", payload: true });
        break;
      case "user_email":
        dispatch({ type: "SET_EMAIL_TOUCHED", payload: true });
        break;
      case "user_password":
        dispatch({ type: "SET_PASSWORD_TOUCHED", payload: true });
        break;
    }
  }

  React.useEffect(() => {
    if (current === "sign-in") {
      if (state.emailError || state.passwordError) {
        dispatch({ type: "SET_FORM_VALID", payload: false });
      } else {
        dispatch({ type: "SET_FORM_VALID", payload: true });
      }
    } else if (current === "sign-up") {
      if (state.nameError || state.emailError || state.passwordError) {
        dispatch({ type: "SET_FORM_VALID", payload: false });
      } else {
        dispatch({ type: "SET_FORM_VALID", payload: true });
      }
    }
  }, [state.emailError, state.nameError, state.passwordError, current]);

  const { userSignIn, userSignUp } = React.useContext(UserContext);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.formValid) {
      if (current === "sign-in") {
        userSignIn({ email: state.email, password: state.password });
      } else if (current === "sign-up") {
        userSignUp({
          name: state.name,
          email: state.email,
          password: state.password,
        });
      }
    }
  }

  return (
    <>
      <form onSubmit={submitHandler} className={styles["auth-form"]}>
        {current === "sign-up" && (
          <div
            className={`${styles["auth-form__component"]} ${
              state.nameTouched && state.nameError
                ? styles["auth-form__component--error"]
                : ""
            }`}
          >
            <span
              className={`${styles["auth-form__component__error-text"]} ${
                state.nameError && state.nameTouched
                  ? styles["auth-form__component__error-text--visible"]
                  : ""
              }`}
            >
              {state.nameError}
            </span>
            <input
              placeholder=" "
              value={state.name}
              onChange={userNameChangeHandler}
              onBlur={blurHandler}
              type="text"
              name="user_name"
              id="user_name"
              className={`${styles["auth-form__component__input"]} ${
                state.nameTouched && state.nameError
                  ? styles["auth-form__component__input--error"]
                  : ""
              }`}
            />
            <label
              className={`${styles["auth-form__component__label"]} ${
                state.nameTouched && state.nameError
                  ? styles["auth-form__component__label--error"]
                  : ""
              }`}
              htmlFor="user_name"
            >
              Name
            </label>
          </div>
        )}
        <div
          className={`${styles["auth-form__component"]} ${
            state.emailTouched && state.emailError
              ? styles["auth-form__component--error"]
              : ""
          }`}
        >
          <span
            className={`${styles["auth-form__component__error-text"]} ${
              state.emailError && state.emailTouched
                ? styles["auth-form__component__error-text--visible"]
                : ""
            }`}
          >
            {state.emailError}
          </span>

          <input
            placeholder=" "
            value={state.email}
            onChange={emailChangeHandler}
            onBlur={blurHandler}
            type="text"
            name="user_email"
            id="user_email"
            className={`${styles["auth-form__component__input"]} ${
              state.emailTouched && state.emailError
                ? styles["auth-form__component__input--error"]
                : ""
            }`}
          />
          <label
            className={`${styles["auth-form__component__label"]} ${
              state.emailTouched && state.emailError
                ? styles["auth-form__component__label--error"]
                : ""
            }`}
            htmlFor="user_email"
          >
            Email
          </label>
        </div>
        <div
          className={`${styles["auth-form__component"]} ${
            state.passwordTouched && state.passwordError
              ? styles["auth-form__component--error"]
              : ""
          }`}
        >
          <span
            className={`${styles["auth-form__component__error-text"]} ${
              state.passwordError && state.passwordTouched
                ? styles["auth-form__component__error-text--visible"]
                : ""
            }`}
          >
            {state.passwordError}
          </span>

          <input
            placeholder=" "
            value={state.password}
            onChange={passChangeHandler}
            onBlur={blurHandler}
            type="text"
            name="user_password"
            id="user_password"
            className={`${styles["auth-form__component__input"]} ${
              state.passwordTouched && state.passwordError
                ? styles["auth-form__component__input--error"]
                : ""
            }`}
          />
          <label
            className={`${styles["auth-form__component__label"]} ${
              state.passwordTouched && state.passwordError
                ? styles["auth-form__component__label--error"]
                : ""
            }`}
            htmlFor="user_password"
          >
            Password
          </label>
        </div>
        <button
          disabled={!state.formValid}
          className={styles["btn-pink"]}
          type="submit"
        >
          {current === "sign-in" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className={styles["auth-form__links"]}></div>
      <div className={styles["auth-form__links__wrapper"]}>
        <div className={styles["auth-form__links__link__wrapper"]}>
          <span className={styles["auth-form__links__text"]}>
            {current === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <a
            className={`${styles["auth-form__links__link"]} ${styles["btn-light"]}`}
            onClick={(e) => {
              e.preventDefault();
              redirect(
                current === "sign-in"
                  ? "/snake-game/auth--sign-up"
                  : "/snake-game/auth--sign-in"
              );
            }}
            href={`${
              current === "sign-in"
                ? "/snake-game/auth--sign-up"
                : "/snake-game/auth--sign-in"
            }`}
          >
            {current === "sign-in" ? "Sign Up" : "Sign In"}
          </a>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
