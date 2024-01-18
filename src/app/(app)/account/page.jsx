import UsernameForm from '@/components/forms/UsernameForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';
import PageSettingsForm from '@/components/forms/PageSettingsForm';
import PageButtonsForm from '@/components/forms/PageButtonsForm';
import PageLinksForm from '@/components/forms/PageLinksForm';

async function AccountPage({ searchParams, ...rest }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const desiredUsername = searchParams?.desiredUsername;

  // not logged in, redirect to home page
  if (!session) {
    return redirect('/');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  let page = await Page.findOne({ owner: session?.user?.email });
  page = JSON.parse(JSON.stringify(page));

  // Logged in but no page name was chosen yet
  if (!page) {
    return (
      <div>
        <UsernameForm desiredUsername={desiredUsername} />
      </div>
    );
  }

  return (
    <>
      <PageSettingsForm page={page} user={user} />
      <PageButtonsForm page={page} user={user} />
      <PageLinksForm page={page} user={user} />
    </>
  );
}

export default AccountPage;
