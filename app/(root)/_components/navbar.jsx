'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home } from 'lucide-react';
import SignOutButton from '@/app/(auth)/_components/sign-out-button';
import { useAuth } from '@/app/(auth)/_components/auth.provider';


const Navbar = () => {
    const { user, setUser } = useAuth();

    const handleSignOutButton = () => {
        setUser(null);
    };
    
    const initials = user?.displayName
    ?.split(' ')
    .map((name) => name[0])
    .join('');

    return (
        <div className='flex justify-between items-center w-full px-6 md:px-16 lg:px-36 py-4 bg-secondary-muted border-b border-tertiary shadow'>
            <div>
            <Link href='/'>
                <button>
                    <Home />
                </button>
            </Link>
            </div>
            <div className='flex gap-2 justify-between items-center'>
                {user ? (
                    <SignOutButton onSignOut={handleSignOutButton} />
                ) : (
                    <Link href='/sign-in'>
                        <button>Sign in</button>
                    </Link>
                )}

                {!user && (
                    <Link href='/sign-up'>
                        <button>Sign Up</button>
                    </Link>
                )}
            
                {user && (
                    <Avatar>
                    {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                    ) : (
                        <AvatarFallback>{initials}</AvatarFallback>
                    )}
                    </Avatar>
                  
                )}
            </div>
        </div>
    );
};
export default Navbar;
