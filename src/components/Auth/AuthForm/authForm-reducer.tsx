interface InitialState {
  name: string;
  nameTouched: boolean;
  nameError: string;
  email: string;
  emailTouched: boolean;
  emailError: string;
  password: string;
  passwordTouched: boolean;
  passwordError: string;
  formValid: boolean;
}

export const authFormReducerInitialState: InitialState = {
  name: "",
  nameTouched: false,
  nameError: "Min length of username is 4!",
  email: "",
  emailTouched: false,
  emailError: "Please enter a valid  email!",
  password: "",
  passwordTouched: false,
  passwordError: "Min length of password is 6!",
  formValid: false,
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_NAME_TOUCHED"; payload: boolean }
  | { type: "SET_NAME_ERROR"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_EMAIL_TOUCHED"; payload: boolean }
  | { type: "SET_EMAIL_ERROR"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD_TOUCHED"; payload: boolean }
  | { type: "SET_PASSWORD_ERROR"; payload: string }
  | { type: "SET_FORM_VALID"; payload: boolean };

export function authFormReducer(state: InitialState, action: Action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_NAME_TOUCHED": {
      return {
        ...state,
        nameTouched: action.payload,
      };
    }
    case "SET_NAME_ERROR": {
      return {
        ...state,
        nameError: action.payload,
      };
    }

    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_EMAIL_TOUCHED": {
      return {
        ...state,
        emailTouched: action.payload,
      };
    }
    case "SET_EMAIL_ERROR": {
      return {
        ...state,
        emailError: action.payload,
      };
    }
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "SET_PASSWORD_TOUCHED": {
      return {
        ...state,
        passwordTouched: action.payload,
      };
    }
    case "SET_PASSWORD_ERROR": {
      return {
        ...state,
        passwordError: action.payload,
      };
    }
    case "SET_FORM_VALID": {
      return {
        ...state,
        formValid: action.payload,
      };
    }
    default:
      return state;
  }
}
