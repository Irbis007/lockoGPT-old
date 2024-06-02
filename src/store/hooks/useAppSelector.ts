import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '..';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
