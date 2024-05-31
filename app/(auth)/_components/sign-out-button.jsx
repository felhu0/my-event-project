'use client';

import { auth } from '@/firebase.config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignOutButton = ({ onSignOut }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            if (onSignOut) {
                onSignOut();
            }
            router.push('/login-prompt');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
