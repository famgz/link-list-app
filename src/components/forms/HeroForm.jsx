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
      className='inline-flex items-center bg-white shadow-lg shadow-gray-700/30'
    >
      <span className='bg-white py-4 pl-4'>linklist.to /</span>
      <input
        type='text'
        name='username'
        id='username'
        className='p-2 mx-2 grow bg-gray-50 font-bold shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2)]'
        placeholder='username?'
        required={true}
        maxLength={20}
        minLength={3}
      />
      <button type='submit' className='bg-blue-500 text-white py-4 px-6'>
        Join for Free
      </button>
    </form>
  );
}
