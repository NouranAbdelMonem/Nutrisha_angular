export interface UserLoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  language: string;
  personalImage: string;
  isOwned: boolean;
  permissions: string[];
  roleName: string;
}
