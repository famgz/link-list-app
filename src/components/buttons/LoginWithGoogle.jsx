'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginWithGoogle(params) {
  return (
    <button
    onClick={() => {}}
    className='flex gap-3 justify-center items-center bg-white shadow text-center w-full py-4'
  >
    <FontAwesomeIcon icon={faGoogle} className='h-6' />
    <span>Sign In with Google</span>
  </button>
  )
};
