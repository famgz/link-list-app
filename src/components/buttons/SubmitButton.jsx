import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, className = '' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className={
        'flex gap-2 justify-center items-center bg-blue-500 disabled:bg-blue-300 text-white disabled:text-gray-200 py-2 px-4 mx-auto w-full ' +
        className
      }
    >
      {pending ? <span>Saving...</span> : children}
    </button>
  );
}
