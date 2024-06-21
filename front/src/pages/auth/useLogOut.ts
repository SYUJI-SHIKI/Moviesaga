import { useRouter } from 'next/router';
import axios from 'axios';

const useLogOut = () => {
  const router = useRouter();

  const logOut = async () => {
    if (typeof window === 'undefined') return;

    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access-token');

    console.log(uid);

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/sign_out`, {
        headers: {
          'client': client,
          'uid': uid,
          'access-token': accessToken
        }
      });

      // ログアウト成功時
      localStorage.removeItem('client');
      localStorage.removeItem('uid');
      localStorage.removeItem('access-token');

      console.log('トークン削除後のlocalStorage:', {
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
        accessToken: localStorage.getItem('access-token')
      });

      router.push("/");

      return response;
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  return logOut;
};

export default useLogOut;