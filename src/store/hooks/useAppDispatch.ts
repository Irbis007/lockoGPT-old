import { useDispatch } from 'react-redux';
import { AppDispatch } from '..';

const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export default useAppDispatch;
