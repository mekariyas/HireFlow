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

export interface IJobForm {
  location: string;
  jobType: string;
  title: string;
  description: string;
}

export interface IJob {
  id: number;
  title: string;
  description: string;
  locationType: string;
  jobType: string;
  status: string;
  companyId: number;
}

export interface IApplication {
  id: number;
  jobId: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  skills: string;
  profileURL: string;
  cvURL: string;
  status: string;
}
