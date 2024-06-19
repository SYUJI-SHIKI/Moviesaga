import authApi from "../auth";

const logIn = async (email: string, password: string): Promise<any> => {
  const response = await authApi.post(
    "/auth/sign_in",
    {
      email,
      password,
    },
    {
      headers: {
        "Contect-Type": "application/json",
      },
    }
  );
  return response;
};

export default logIn;
