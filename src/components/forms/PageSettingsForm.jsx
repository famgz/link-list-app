'use client';

import { savePageSettings } from '@/actions/pageActions';
import SubmitButton from '@/components/buttons/SubmitButton';
import RadioTogglers from '@/components/formItems/RadioTogglers';
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
import SectionBox from '../layout/SectionBox';
import fileUpload from '@/libs/fileUpload';

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

  async function handleCoverImageChange(ev) {
    await fileUpload(ev, (link) => setBgImage(link));
  }

  async function handleAvatarImageChange(ev) {
    await fileUpload(ev, (link) => setAvatarImage(link));
  }

  return (
    <div className=''>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className='flex justify-center items-center bg-gray-300 min-h-[300px] py-4 -m-4 bg-cover bg-center'
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
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className='h-6 w-6'
                    />
                    <span>Change image</span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-center w-[140px] h-[140px] relative -mb-12 -top-12 mx-auto'>
            <div className='flex items-center w-[140px] h-[140px] overflow-hidden rounded-full border-4 border-white shadow shadow-black/30'>
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

            <label htmlFor='avatarIn' className='edit-tag' type='button'>
              <FontAwesomeIcon icon={faCloudArrowUp} className='h-6 w-6' />
            </label>
            <input
              onChange={handleAvatarImageChange}
              type='file'
              id='avatarIn'
              className='hidden'
            />
            <input type='hidden' name='avatar' value={avatarImage} />
          </div>
          <div className='p-0'>
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
              <FontAwesomeIcon icon={faSave} className='h-5 w-5' />
              <span>Save</span>
            </SubmitButton>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
