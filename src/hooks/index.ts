import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {AppDispatch, RootState} from '../redux/store/index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;