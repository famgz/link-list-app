import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import '@/app/globals.css';
import AppSidebar from '@/components/layout/AppSidebar';
import SectionBox from '@/components/layout/SectionBox';
import { getServerSession } from 'next-auth';
import { Lato } from 'next/font/google';
import Image from 'next/image';
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

  return (
    <html lang='en'>
      <body className={lato.className}>
        <Toaster />
        <main className='flex min-h-screen'>
          <aside className='bg-white w-48 p-4 pt-6 shadow'>
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
              <AppSidebar />
            </div>
          </aside>
          <div className='grow'>{children}</div>
        </main>
      </body>
    </html>
  );
}
