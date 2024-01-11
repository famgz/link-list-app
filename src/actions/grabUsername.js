'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export default async function grabUsername(formData) {
  const username = formData.get('username');
  mongoose.connect(process.env.MONGODB_URI);
  const existingPageDoc = await Page.findOne({ uri: username });
  if (existingPageDoc) {
    return false;
  }
  const session = await getServerSession(authOptions);
  const email = session?.user?.email
  if(!email) {
    console.log('User email not found')
    return false
  }
  return await Page.create({ uri: username, owner: email });
}
