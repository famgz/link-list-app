import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import '@/app/globals.css';
import AppSidebar from '@/components/layout/AppSidebar';
import SectionBox from '@/components/layout/SectionBox';
import { Page } from '@/models/Page';
import { faBars, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { Lato } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Link List App',
  description: 'Linktree clone created with NextJS',
};

export default async function AppTemplate({ children, ...rest }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session) {
    return redirect('/');
  }

  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: user?.email });

  return (
    <html lang='en'>
      <body className={lato.className}>
        <Toaster />
        <main className='md:flex min-h-screen'>
          <label
            htmlFor='navCb'
            className='md:hidden ml-8 mt-4 p-4 rounded-md bg-white shadow inline-flex items-centers gap-2 cursor-pointer'
          >
            <FontAwesomeIcon icon={faBars} />
            <span>Open navigation</span>
          </label>
          <input type='checkbox' name='navCb' id='navCb' className='hidden' />
          <label
            htmlFor='navCb'
            className='hidden backdrop fixed inset-0 bg-black/80 z-10'
          />
          <aside className='bg-white w-48 p-4 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all'>
            <div className='sticky top-0 pt-2'>
              <div className='rounded-full overflow-hidden aspect-square w-24 mx-auto'>
                <Image
                  src={user.image}
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  sizes='100vw'
                  alt='avatar'
                />
              </div>
              {page && (
                <Link
                  target='_blank'
                  href={'/page/' + page.uri}
                  className='flex items-center justify-center gap-1 mt-4'
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    className='text-blue-500 w-6 h-6'
                  />
                  <span className='font-bold text-2xl text-gray-300'>/</span>
                  <span className='font-bold'>{page.uri}</span>
                </Link>
              )}
              <div className='text-center'>
                <AppSidebar />
              </div>
            </div>
          </aside>
          <div className='grow'>{children}</div>
        </main>
      </body>
    </html>
  );
}
