export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }