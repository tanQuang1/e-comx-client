import { RootState } from '@/store';
import { resetUserDetail } from '@/store/user/user.slice';

import { useDispatch, useSelector } from 'react-redux';

export default function useUser() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  function logout() {
    dispatch(resetUserDetail());
  }
  return {
    user,
    logout,
  };
}
