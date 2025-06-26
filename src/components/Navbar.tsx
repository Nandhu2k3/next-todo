'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LogOut } from 'lucide-react';
import { styles } from '@/lib/styles';

const Navbar = () => {
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut(auth).catch(error => console.error("Sign out error", error));
    };

    const navLinks = [
        { href: '/', label: 'Todo List' },
        { href: '/profile', label: 'Profile' },
        { href: '/report', label: 'Report' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav style={styles.navbar}>
            <div style={styles.navLinksContainer}>
                {navLinks.map(link => {
                    const isActive = pathname === link.href;
                    const linkStyle = isActive 
                        ? { ...styles.link, ...styles.activeLink } 
                        : styles.link;
                    return (
                        <Link key={link.href} href={link.href} style={linkStyle}>
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <button onClick={handleSignOut} title="Sign Out" style={styles.signOutButton}>
                <LogOut size={24} />
            </button>
        </nav>
    );
};

export default Navbar;