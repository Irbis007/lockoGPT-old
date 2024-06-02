import useAppSelector from '@/store/hooks/useAppSelector';

const useAuth = () => {
  return useAppSelector(state => state.user);
};

export default useAuth;
