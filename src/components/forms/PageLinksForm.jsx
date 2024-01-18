'use client';

import SectionBox from '@/components/layout/SectionBox';
import {
  faArrowsUpDown,
  faCloudArrowUp,
  faLink,
  faPlus,
  faSave,
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
        <div>
          <ReactSortable
            handle='.sortable-handle'
            list={links}
            setList={setLinks}
          >
            {links.map((l) => (
              <div
                key={l.key}
                className='mt-8 flex gap-2 items-center text-gray-600'
              >
                <FontAwesomeIcon
                  icon={faArrowsUpDown}
                  className='sortable-handle self-start'
                />

                <div className='text-center'>
                  <div className='bg-gray-300 w-20 h-20 inline-flex items-center justify-center mx-auto overflow-hidden'>
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
                  <div>
                    <input
                      onChange={(ev) => handleUpload(ev, l.key)}
                      type='file'
                      name=''
                      id={'icon' + l.key}
                      className='hidden'
                    />
                    <label
                      htmlFor={'icon' + l.key}
                      className='border mt-2 p-2 flex items-center gap-1 rounded-md cursor-pointer'
                    >
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className='w-5 h-5'
                      />
                      <span>Change icon</span>
                    </label>
                  </div>
                </div>
                <div className='grow'>
                  <input
                    value={l.title}
                    onChange={(ev) => handleLinkChange(ev, l.key, 'title')}
                    className='settings-input'
                    type='text'
                    placeholder='title'
                  />
                  <input
                    value={l.subtitle}
                    onChange={(ev) => handleLinkChange(ev, l.key, 'subtitle')}
                    className='settings-input'
                    type='text'
                    placeholder='subtitle (optional)'
                  />
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
        </div>
        <SubmitButton className='max-w-[200px] mx-auto'>
          <FontAwesomeIcon icon={faSave} className='w-5 h-5' />
          <span>Save</span>
        </SubmitButton>
      </form>
    </SectionBox>
  );
}
