import authApi from "./auth";

interface AuthResponse {
  data: {
    id: number;
    email: string;
    provider: string;
    uuid: string;
    allow_password_change: boolean;
    name: string;
    nickname: string;
  };
  errors?: string[];
}

const signUp = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<AuthResponse> => {
  console.log("SignUp request:", {
    name,
    email,
    password,
    passwordConfirmation,
  });

  try {
    const response = await authApi.post("api/v1/auth", {
      registration: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });
    console.log("SignUp response:", response.data);

    return response.data;
  } catch (error:any) {
      console.error("新規登録できませんでした", error);
      throw new Error(error.response.data.message);
  }
};

export default signUp;
