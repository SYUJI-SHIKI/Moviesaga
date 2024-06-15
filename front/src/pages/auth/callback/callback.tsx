import { useEffect } from "react"; 
import { useRouter } from "next/router";

const AuthCallback = () => {
  const router = useRouter();
  const { uid, client, "access-token": accessToken } = router.query;

  useEffect(() => {
    if (uid && client && accessToken) {
      console.log('UID:', uid);
      console.log('Client:', client);
      console.log('Access-Token:', accessToken);

    }
  }, [uid, client, accessToken]);

  return (
    <div>
      <h1>Auth Callback</h1>
      <p>Processing authentication...</p>
    </div>
  );
};

export default AuthCallback;