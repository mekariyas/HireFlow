export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  niche: string;
  role: string;
  skills: string;
  cv: FileList;
  profileImg?: FileList;
}

export interface ISignIn {
  email: string;
  password: string;
}
