'use client';

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';

export default function LogoutButton(params) {
  return (
    <button className='flex items-center gap-2 border py-1 px-4 shadow' onClick={() => signOut()}>
      <span>Logout</span>
      <FontAwesomeIcon icon={faRightFromBracket}/>
    </button>
  );
}
