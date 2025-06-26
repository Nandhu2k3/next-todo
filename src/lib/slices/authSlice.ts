import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'loading', // Start in loading state
    error: null,
};

type SerializableUser = Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'> & {
    metadata: { creationTime?: string; lastSignInTime?: string; };
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SerializableUser | null>) => {
            state.user = action.payload as User;
            state.status = 'succeeded';
        },
        setAuthLoading: (state) => {
            state.status = 'loading';
        },
        setAuthFailed: (state) => {
            state.user = null;
            state.status = 'failed';
        },
    },
});

export const { setUser, setAuthLoading, setAuthFailed } = authSlice.actions;
export default authSlice.reducer;