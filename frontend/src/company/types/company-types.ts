export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  niche: string;
  role: string;
  description: string;
  profileImg?: FileList;
}
