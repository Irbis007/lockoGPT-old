export interface AuthResponse {
  data: {
    name: string;
    email: string;
  },
  access_token: string;
}

export interface IProfile {
  name: string;
  email: string;
}

export interface ISignupErrorResponse {
  errors: {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[]
  }
}
