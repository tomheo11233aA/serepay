// ReduxService.js
import { useAppDispatch } from '@hooks/redux';
import { setIsTokenExpired } from '@redux/slice/userSlice';
import { AppDispatch } from '@redux/store/store';

const dispatch: AppDispatch = useAppDispatch();

const ReduxService = {
    dispatchTokenExpiredAction: () => {
        dispatch(setIsTokenExpired(true));
    }
};

export default ReduxService;