import React from 'react';
import Button from './Button';

const LoginButton = () => (
  <Button href="/auth/login"
    className="bg-gradient-to-br from-red-100 to-rose-800 
    group-hover:from-red-200 group-hover:to-rose-800 
    dark:text-white hover:text-gray-900 
    focus:ring-4 focus:outline-none focus:ring-rose-200 
    dark:focus:ring-rose-800 duration-500">
    <div className='md:px-10 md:py-3'>
        ログイン
    </div>
</Button>
);

export default LoginButton;