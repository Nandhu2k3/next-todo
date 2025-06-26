'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser, setAuthFailed } from './slices/authSlice';
import { useEffect } from 'react';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializableUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            metadata: {
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
            },
        };
        storeRef.current?.dispatch(setUser(serializableUser));
      } else {
        storeRef.current?.dispatch(setAuthFailed());
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}