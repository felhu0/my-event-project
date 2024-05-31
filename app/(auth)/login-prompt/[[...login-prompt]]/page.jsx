'use client';

import withAuth from "@/app/hoc/withAuth";
import Link from "next/link";


const LoginPrompt = () => {
    
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-4">Please log in</h1>
        <h3 className="mb-6" >To access this page, you need to log in or create an account.</h3>
        <div>
          <Link href="/sign-in" className="underline">
          Log in
          </Link>
          {' or '}
          <Link href="/sign-up" className="underline">
          Register
          </Link>
        </div>
      </div>
    );
  };
  
  export default withAuth(LoginPrompt);