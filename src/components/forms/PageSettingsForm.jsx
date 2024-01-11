import { faImage, faPalette } from '@fortawesome/free-solid-svg-icons';
import RadioTogglers from '@/components/formItems/radioTogglers';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function PageSettingsForm({ page }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className='-m-4'>
      <form>
        <div className='bg-gray-300 py-16 flex justify-center items-center'>
          <RadioTogglers
            options={[
              { value: 'color', icon: faPalette, label: 'Color' },
              { value: 'image', icon: faImage, label: 'Image' },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className='h-32 w-32 mx-auto relative -top-8 -mb-8'>
          <Image
            src={user?.image}
            alt='avatar'
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            sizes='100vw'
            className='rounded-full border-4 border-white shadow-md shadow-black/30'
          />
        </div>
        <div className='p-4'>
          <label className='settings-label' htmlFor="nameIn">Display name</label>
          <input id='nameIn' className='settings-input' type="text" placeholder='John Doe' />

          <label className='settings-label' htmlFor="locationIn">Location</label>
          <input id='locationIn' className='settings-input' type="text" placeholder='Somewhere in the world' />

          <label className='settings-label' htmlFor="bioIn">Bio</label>
          <textarea id='bioIn' className='settings-input'  placeholder='Your bio goes here...' />
        </div>
      </form>
    </div>
  );
}
