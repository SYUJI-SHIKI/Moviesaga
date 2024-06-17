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

const signUp = async (name:string, email:string, password: string, passwordConfirmation: string): Promise<AuthResponse> => {
  console.log('SignUp request:', { name, email, password, passwordConfirmation });
  const response = await authApi.post('/auth', {
    registration: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });
  console.log('SignUp response:', response.data);
  return response.data;
};

// export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
//   const response = await authApi.post('/auth/sign_in', {
//     email,
//     password,
//   });
//   return response.data;
// };

// export const signOut = async (): Promise<void> => {
//   await authApi.delete('/auth/sign_out');
//   localStorage.removeItem('access-token');
//   localStorage.removeItem('client');
//   localStorage.removeItem('uid');
// };

export default signUp;