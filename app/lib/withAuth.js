'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../(auth)/_components/auth.provider";


const withAuth = (WrappedComponent) => {
    return (props) => {
      const { user, authLoaded } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        
        if (authLoaded && !user) {
          console.log('Not logged in');
          router.push('/login-prompt');
        } else if (authLoaded && user) {
            router.push('/');
        }
      }, [user, authLoaded, router]);
  
      return <WrappedComponent {...props} />;
    };
  };
  
  export default withAuth;