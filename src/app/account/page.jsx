import UsernameForm from '@/components/forms/UsernameForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Page } from '@/models/Page';

export default async function AccountPage({ searchParams, ...rest }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  
  // not logged in, redirect to home page
  if (!session) {
    return redirect('/');
  }

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
