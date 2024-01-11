import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileLines } from '@fortawesome/free-solid-svg-icons';
import {
  faChartLine,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import LogoutButton from '@/components/buttons/LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Link List App',
  description: 'Linktree clone created with NextJS',
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session) {
    return redirect('/');
  }

  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex min-h-screen'>
          <aside className='bg-white w-48 p-4 shadow'>
            <div className='rounded-full overflow-hidden aspect-square w-24 mx-auto'>
              <Image
                src={user.image}
                alt='avatar'
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                sizes='100vw'
              />
            </div>
            <div className='text-center'>
              <nav className='inline-flex flex-col text-center mt-8 gap-6'>
                <Link href='/account' className='account-links'>
                  <FontAwesomeIcon icon={faFileLines} />
                  <span>My Page</span>
                </Link>

                <Link href='/analytics' className='account-links'>
                  <FontAwesomeIcon icon={faChartLine} />
                  <span>Analytics</span>
                </Link>

                <LogoutButton className='account-links flex-row-reverse justify-end' />

                <Link href='/' className='account-links border-t pt-4 text-xs !gap-2'>
                  <FontAwesomeIcon icon={faArrowLeft} className='!h-3 !w-3' />
                  <span className='whitespace-nowrap'>Back to Website</span>
                </Link>
              </nav>
            </div>
          </aside>
          <div className='grow'>
            <div className='bg-white m-8 p-4 shadow-lg'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
