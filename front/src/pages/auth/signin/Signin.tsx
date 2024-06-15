const SignIn = () => {
  const handleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_TEST_API_URL}/auth/google_oauth2`;
  };

  return (
    <div>
      <button onClick={handleSignIn}>Singn in with Google</button>
    </div>
  );
};

export default SignIn;