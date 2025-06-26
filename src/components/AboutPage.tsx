import React from 'react';
import { styles } from '@/lib/styles';

const AboutPage = () => (
    <div style={styles.pageBox}>
        <h1 style={styles.title}>About This App</h1>
        <div style={styles.infoText}>
            <p>This is a modern Todo application built with:</p>
            <ul style={styles.aboutList}>
                <li>React & TypeScript</li>
                <li>Next.js (App Router)</li>
                <li>Redux Toolkit for state management</li>
                <li>Firebase for authentication and database</li>
                <li>CSS-in-JS for styling</li>
            </ul>
        </div>
    </div>
);

export default AboutPage;