'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Page } from '@/models/Page';
import { User } from '@/models/User';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('Not logged in');
    return false;
  }

  const dataKeys = [
    'displayName',
    'location',
    'bio',
    'bgType',
    'bgColor',
    'bgImage',
  ];

  const dataToUpdate = {};
  for (const key of dataKeys) {
    const value = formData.get(key);
    if (!value) {
      continue;
    }
    dataToUpdate[key] = value;
  }

  console.log({ dataToUpdate });
  await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

  const avatarLink = formData.get('avatar');
  if (avatarLink) {
    await User.updateOne(
      { email: session?.user?.email },
      { image: avatarLink }
    );
  }

  return true;
}

export async function savePageButtons(formData) {  // formData is from uncontrolled inputs
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('Not logged in');
    return false;
  }

  const buttonsValues = {};
  formData.forEach((value, key) => {
    if(value) {
      buttonsValues[key] = value;
    }
  });

  const dataToUpdate = { buttons: buttonsValues };
  console.log({ dataToUpdate });
  await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

  return true;
}

export async function savePageLinks(links) {  // links are from controlled inputs
  mongoose.connect(process.env.MONGODB_URI)
  const session = await getServerSession(authOptions)
  if (!session) {
    console.log('Not logged in')
    return false
  }

  await Page.updateOne({owner: session?.user?.email}, {links})

}