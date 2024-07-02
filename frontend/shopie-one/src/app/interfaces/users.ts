export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}
export interface token_details {
  info?: {
    id: string;
    username: string;
    email: string;
    name: string;
    role: string;
  };
  error?: {
    message: string;
  };
}
