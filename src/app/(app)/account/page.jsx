import UsernameForm from '@/components/forms/UsernameForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';

export default async function AccountPage({ searchParams, ...rest }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  
  // not logged in, redirect to home page
  if (!session) {
    return redirect('/');
  }

  await mongoose.connect(process.env.MONGODB_URI)

  const page = await Page.findOne({owner: session?.user?.email})

  if(page) {
    return (
      <div>your page is: /{page.uri}</div>
    )
  }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
