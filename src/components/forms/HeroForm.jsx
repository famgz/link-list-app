'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HeroForm({ user }) {
  const router = useRouter()

  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector('input');
    const username = input.value;
    const callbackUrl = '/account?desiredUsername=' + username;
    // no much need since the input is `required`
    if (!username) {
      console.log('no username', input);
      return;
    }
    if (user) {
      router.push(callbackUrl);
    }
    await signIn('google', {
      redirect: true,
      callbackUrl: callbackUrl,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='inline-flex items-center shadow-lg shadow-gray-700/30'
    >
      <span className='bg-white py-4 pl-4'>linklist.to/</span>
      <input
        type='text'
        name=''
        id=''
        className='py-4'
        placeholder='username'
        required={true}
      />
      <button type='submit' className='bg-blue-500 text-white py-4 px-6'>
        Join for Free
      </button>
    </form>
  );
}
