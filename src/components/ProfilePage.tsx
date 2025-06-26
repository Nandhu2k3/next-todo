'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { styles } from '@/lib/styles';

const ProfilePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) return <p>Loading profile...</p>;

    const creationTime = user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A';

    return (
        <div style={styles.pageBox}>
            <h1 style={styles.title}>User Profile</h1>
            <div style={styles.infoText}>
                <p><strong style={styles.infoLabel}>Email:</strong> {user.email}</p>
                <p><strong style={styles.infoLabel}>User ID:</strong> {user.uid}</p>
                <p><strong style={styles.infoLabel}>Account Created:</strong> {creationTime}</p>
            </div>
        </div>
    );
};

export default ProfilePage;