'use client';

import SectionBox from '@/components/layout/SectionBox';
import {
  faArrowsUpDown,
  faCloudArrowUp,
  faLink,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '@/components/buttons/SubmitButton';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import fileUpload from '@/libs/fileUpload';
import Image from 'next/image';
import { savePageLinks } from '@/actions/pageActions';
import toast from 'react-hot-toast';

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);

  async function save() {
    await savePageLinks(links);
    toast.success('Saved!');
  }

  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: '',
          subtitle: '',
          icon: '',
          url: '',
        },
      ];
    });
  }

  function removeLink(keyToRemove) {
    setLinks((prev) => prev.filter((b) => b.key !== keyToRemove));
  }

  function handleLinkChange(ev, keyOfLinkToChange, prop) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return newLinks;
    });
  }

  function handleUpload(ev, linkKeyForUpload) {
    fileUpload(ev, (uploadedImageUrl) => {
      setLinks((prev) => {
        const newLinks = [...prev];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className='text-2xl font-bold mb-4'>Links</h2>

        {/* Add new link button */}
        <button
          type='button'
          onClick={addNewLink}
          className='text-blue-500 text-lg flex gap-2 items-center font-bold cursor-pointer'
        >
          <FontAwesomeIcon
            icon={faPlus}
            className='h-5 w-5 bg-blue-500 text-white p-1 rounded-full'
          />
          <span>Add new</span>
        </button>

        {/* Links list */}
        <ReactSortable
          handle='.sortable-handle'
          list={links}
          setList={setLinks}
        >
          {links.map((l) => (
            <div key={l.key} className='flex items-stretch mt-8 text-gray-600'>
              {/* Sortable Handle Column */}
              <div className='self-start'>
                <FontAwesomeIcon
                  icon={faArrowsUpDown}
                  className='sortable-handle'
                />
              </div>

              {/* Icon image Column*/}
              <div className='grid content-between self-stretch mt-6 mr-6'>
                <div>
                  <div className='flex items-center justify-center bg-gray-300 w-28 h-28 shadow shadow-black/30 mx-auto rounded-full overflow-hidden'>
                    {l.icon ? (
                      <Image
                        src={l.icon}
                        alt='icon'
                        width={64}
                        height={64}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <FontAwesomeIcon icon={faLink} className='w-12 h-12' />
                    )}
                  </div>
                  <div className='relative'>
                    <input
                      onChange={(ev) => handleUpload(ev, l.key)}
                      type='file'
                      name=''
                      id={'icon' + l.key}
                      className='hidden'
                    />
                    <label
                      htmlFor={'icon' + l.key}
                      className='edit-tag bottom-0 !-right-2'
                    >
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className='w-5 h-5'
                      />
                    </label>
                  </div>
                </div>

                {/* Delete link button */}
                <div className='mb-2'>
                  <button
                    type='button'
                    onClick={() => removeLink(l.key)}
                    className='flex gap-2 items-center self-end text-gray-600 py-2 px-2 bg-gray-300 cursor-pointer'
                  >
                    <FontAwesomeIcon icon={faTrash} className='w-4 h-4' />
                    <span className='font-bold'>remove link</span>
                  </button>
                </div>
              </div>

              {/* Input fields Column */}
              <div className='grow'>
                <label className='settings-label' htmlFor=''>
                  Title
                </label>
                <input
                  value={l.title}
                  onChange={(ev) => handleLinkChange(ev, l.key, 'title')}
                  className='settings-input'
                  type='text'
                  placeholder='title'
                />
                <label className='settings-label' htmlFor=''>
                  Subtitle
                </label>
                <input
                  value={l.subtitle}
                  onChange={(ev) => handleLinkChange(ev, l.key, 'subtitle')}
                  className='settings-input'
                  type='text'
                  placeholder='subtitle (optional)'
                />
                <label className='settings-label' htmlFor=''>
                  URL
                </label>
                <input
                  value={l.url}
                  onChange={(ev) => handleLinkChange(ev, l.key, 'url')}
                  className='settings-input'
                  type='text'
                  placeholder='url'
                />
              </div>
            </div>
          ))}
        </ReactSortable>
        <SubmitButton className='max-w-[200px] mx-auto'>
          <FontAwesomeIcon icon={faSave} className='w-5 h-5' />
          <span>Save</span>
        </SubmitButton>
      </form>
    </SectionBox>
  );
}
