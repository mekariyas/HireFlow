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

export interface Ijobs {
  id: number;
  title: string;
  name: string;
  profileURL?: string;
  description: string;
  jobType: string;
  createdAt: string;
  location: string;
  companyId: number;
}

export interface IsearchJobs {
  title?: string;
  locationType?: string;
  jobType?: string;
}
