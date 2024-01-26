import HeroForm from '@/components/forms/HeroForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className='pt-32'>
        <div className='flex flex-col gap-6 max-w-md w-md mb-8'>
          <h1 className='text-4xl md:text-6xl font-bold text-slate-800'>
            Your single link <br /> for everything
          </h1>
          <h2 className='text-slate-400 text-xl'>
            Share your links, social profiles, contact info and more on one page
          </h2>
          <HeroForm user={session?.user} />
        </div>
      </section>
    </main>
  );
}
