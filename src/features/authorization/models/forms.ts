export interface ISigninForm {
  email: string;
  password: string;
}

export interface ISignupForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IPasswordResetForm {
  password: string;
  password_confirmation: string;
}

export interface IEmailForm {
  email: string;
}
