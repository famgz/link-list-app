'use client';

import { savePageSettings } from '@/actions/pageActions';
import SubmitButton from '@/components/buttons/SubmitButton';
import RadioTogglers from '@/components/formItems/radioTogglers';
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatarImage, setAvatarImage] = useState(user?.image);

  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved');
    }
  }

  async function imageUpload(ev, callBackFn) {
    const file = ev.target.files?.[0];

    if (!file) {
      console.log('No file was found');
      return false;
    }

    const promise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((res) => {
        if (res.ok) {
          res.json().then((link) => {
            console.log(link);
            callBackFn(link);
            resolve(link);
          });
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Uploading...',
      success: 'Uploaded!',
      error: 'Upload error',
    });
  }

  async function handleCoverImageChange(ev) {
    await imageUpload(ev, (link) => setBgImage(link));
  }

  async function handleAvatarImageChange(ev) {
    await imageUpload(ev, (link) => setAvatarImage(link));
  }

  return (
    <div className='-m-4'>
      <form action={saveBaseSettings}>
        <div
          className='bg-gray-300 min-h-[300px] py-4 flex justify-center items-center bg-cover bg-center'
          style={
            bgType === 'color'
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div>
            <RadioTogglers
              defaultValue={page.bgType}
              options={[
                { value: 'color', icon: faPalette, label: 'Color' },
                { value: 'image', icon: faImage, label: 'Image' },
              ]}
              onChange={(val) => setBgType(val)}
            />
            {bgType === 'color' && (
              <div className='bg-gray-200 shadow text-gray-700 p-2 mt-2 cursor-pointer'>
                <div className='flex justify-center gap-2'>
                  <label>Background color</label>
                  <input
                    type='color'
                    name='bgColor'
                    onChange={(ev) => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === 'image' && (
              <div className='flex justify-center'>
                <label className='flex gap-2 items-center cursor-pointer bg-white shadow px-4 py-2 mt-2 text-gray-700'>
                  <input type='hidden' name='bgImage' value={bgImage} />
                  <input
                    className='hidden'
                    type='file'
                    onChange={handleCoverImageChange}
                    accept='image/png, image/gif, image/jpeg'
                  />
                  <FontAwesomeIcon icon={faCloudArrowUp} className='h-6 w-6' />
                  <span>Change image</span>
                </label>
              </div>
            )}
          </div>
        </div>
          <div className='flex justify-center w-[180px] h-[180px] relative -mb-12 -top-12 mx-auto'>
            <div className='flex items-center w-[180px] h-[180px] overflow-hidden rounded-full border-4 border-white shadow shadow-black/30'>
              <Image
                src={avatarImage}
                alt='avatar'
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                sizes='100vw'
                className=''
              />
            </div>

            <label
              htmlFor='avatarIn'
              className='absolute flex items-center justify-center bottom-0 -right-0 cursor-pointer bg-white w-10 h-10 text-gray-700 rounded-full shadow shadow-black/30'
              type='button'
            >
              <FontAwesomeIcon icon={faCloudArrowUp} className='h-6 w-6' />
            </label>
            <input
              onChange={handleAvatarImageChange}
              type='file'
              id='avatarIn'
              className='hidden'
            />
            <input type="hidden" name="avatar" value={avatarImage} />
          </div>
        <div className='p-4'>
          <label className='settings-label' htmlFor='nameIn'>
            Display name
          </label>
          <input
            name='displayName'
            defaultValue={page.displayName}
            id='nameIn'
            className='settings-input'
            type='text'
            placeholder='John Doe'
          />

          <label className='settings-label' htmlFor='locationIn'>
            Location
          </label>
          <input
            name='location'
            defaultValue={page.location}
            id='locationIn'
            className='settings-input'
            type='text'
            placeholder='Somewhere in the world'
          />

          <label className='settings-label' htmlFor='bioIn'>
            Bio
          </label>
          <textarea
            name='bio'
            defaultValue={page.bio}
            id='bioIn'
            className='settings-input'
            placeholder='Your bio goes here...'
          />
          <SubmitButton className='max-w-[200px]'>
            <FontAwesomeIcon icon={faSave} className='h-4 w-4' />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
