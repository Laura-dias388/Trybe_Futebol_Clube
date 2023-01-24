export type ServiceLogin = {
  email: string,
  password: string,
};

export type TypeToken = {
  id?: number,
  username: string,
  vocation: string,
  level: number,
};

export interface TypeLogin {
  type: string | null,
  message: string,
}
