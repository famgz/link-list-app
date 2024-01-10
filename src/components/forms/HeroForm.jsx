'use client';

import { signIn } from 'next-auth/react';

export default function HeroForm() {

  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector('input');
    const username = input.value;
    // no much need since the input is `required`
    if (!username) {
      console.log('no username', input);
      return;
    }
    await signIn('google', {
      redirect: true,
      callbackUrl: '/account?username=' + username,
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
