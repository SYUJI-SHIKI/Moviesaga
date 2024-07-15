import { useRouter } from 'next/router';
import useLoading from '@/components/elements/Loading/useLoading';
import axios from 'axios';

const useLogOut = () => {
  const router = useRouter();
  const { loading, startLoading, stopLoading } = useLoading();

  const logOut = async () => {
    if (typeof window === 'undefined') return;

    startLoading();

    const client = localStorage.getItem('client');
    const uuid = localStorage.getItem('uuid');
    const accessToken = localStorage.getItem('access-token');

    console.log(uuid);

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_TEST_API_URL}/api/v1/auth/sign_out`, {
        headers: {
          'client': client,
          'uuid': uuid,
          'access-token': accessToken
        }
      });

      // ログアウト成功時
      localStorage.removeItem('client');
      localStorage.removeItem('uuid');
      localStorage.removeItem('access-token');

      console.log('トークン削除後のlocalStorage:', {
        client: localStorage.getItem('client'),
        uuid: localStorage.getItem('uuid'),
        accessToken: localStorage.getItem('access-token')
      });

      window.dispatchEvent(new Event("storage"));
      await router.push('/');

      return response;
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
      stopLoading()
    }
  };

  return { logOut, loading, startLoading, stopLoading };
};

export default useLogOut;