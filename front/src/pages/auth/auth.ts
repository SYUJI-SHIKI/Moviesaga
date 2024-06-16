import authApi from "./auth_api";

interface AuthResponse {
  data: {
    id: number;
    email: string;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    nickname: string;
  };
}

export const signUp = async (name:string, email:string, password: string, passwordConfirmation: string): Promise<AuthResponse> => {
  const response = await authApi.post('/auth', {
    registration: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });
  return response.data;
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await authApi.post('/auth', {
    email,
    password,
  });
  return response.data;
};

export const signOut = async (): Promise<void> => {
  await authApi.delete('/auth/sign_out');
  localStorage.removeItem('access-token');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');
};