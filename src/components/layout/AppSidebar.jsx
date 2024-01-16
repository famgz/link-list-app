'use client';

import '@/app/globals.css';
import LogoutButton from '@/components/buttons/LogoutButton';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
  const path = usePathname();

  return (
    <nav className='inline-flex flex-col text-center mt-6 gap-3'>
      <Link
        href='/account'
        className={
          'account-links ' +
          (path.includes('/account') ? 'account-current' : '')
        }
      >
        <FontAwesomeIcon icon={faFileLines} />
        <span>My Page</span>
      </Link>

      <Link
        href='/analytics'
        className={
          'account-links ' +
          (path.includes('/analytics') ? 'account-current' : '')
        }
      >
        <FontAwesomeIcon icon={faChartLine} />
        <span>Analytics</span>
      </Link>

      <LogoutButton className={'account-links flex-row-reverse justify-end'} />

      <Link href='/' className={'account-links border-t text-xs !pt-4 !gap-2'}>
        <FontAwesomeIcon icon={faArrowLeft} className='!h-3 !w-3' />
        <span className='whitespace-nowrap'>Back to Website</span>
      </Link>
    </nav>
  );
}
