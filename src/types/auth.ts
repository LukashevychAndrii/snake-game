export interface Auth_NEP {
  name: string;
  email: string;
  password: string;
}

export type Auth_EP = Pick<Auth_NEP, "email" | "password">;

export type Auth_NE = Pick<Auth_NEP, "name" | "email">;

export type Auth_N = Pick<Auth_NEP, "name">;

export type Auth_E = Pick<Auth_NEP, "email">;

export type Auth_P = Pick<Auth_NEP, "password">;
