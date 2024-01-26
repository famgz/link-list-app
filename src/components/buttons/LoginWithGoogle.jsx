'use client';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';

export default function LoginWithGoogle(params) {
  return (
    <button
      onClick={() => signIn('google', { redirect: true, callbackUrl: '/account' })}
      className='flex gap-3 justify-center items-center bg-white shadow text-center text-gray-700 w-full py-4'
    >
      <FontAwesomeIcon icon={faGoogle} className='h-6 w-6' />
      <span>Sign In with Google</span>
    </button>
  );
}
