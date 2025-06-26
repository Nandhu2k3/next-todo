'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/lib/store';
import Navbar from '@/components/Navbar'; // <-- Make sure this is NOT commented out
import { styles } from '@/lib/styles';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, status } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (status === 'failed') {
            router.push('/auth');
        }
    }, [status, router]);

    if (status === 'loading' || !user) {
        return <div style={styles.loadingScreen}>Loading...</div>;
    }

    return (
        <div style={styles.mainLayout}>
            <Navbar /> {/* <-- Make sure this is NOT commented out */}
            <main style={styles.mainContent}>{children}</main>
        </div>
    );
}