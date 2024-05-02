import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const useAuthToken = () => {
  const token = useSelector((state: RootState) => state.authSlice.authToken);
  return token;
};

export default useAuthToken;