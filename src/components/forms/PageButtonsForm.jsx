'use client';

import { savePageButtons } from '@/actions/pageActions';
import SectionBox from '@/components/layout/SectionBox';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faReddit,
  faSkype,
  faSteam,
  faTelegram,
  faTiktok,
  faTwitch,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowsUpDown,
  faEnvelope,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '../buttons/SubmitButton';
import { ReactSortable } from 'react-sortablejs';
import { allButtons } from '@/libs/allButtons';

export default function PageButtonsForm({ page, user }) {
  const pageSavedButtonKeys = Object.keys(page.buttons);
  const pageSavedButtonsInfo = pageSavedButtonKeys.map((k) =>
    allButtons.find((b) => b.key === k)
  );
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function addButtonToProfile(button) {
    setActiveButtons((prev) => {
      return [...prev, button];
    });
  }

  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success('Settings saved!');
  }

  function removeButton(keyToRemove) {
    setActiveButtons((prev) => {
      return prev.filter((b) => b.key !== keyToRemove);
    });
  }

  const availableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className='text-2xl font-bold mb-4'>Buttons</h2>

        {/* Active button links */}
        <ReactSortable
          handle='.sortable-handle'
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className='md:flex items-center mb-4'>
              <div className='w-36 flex gap-1 items-center text-gray-700'>
                <FontAwesomeIcon
                  icon={faArrowsUpDown}
                  className='sortable-handle'
                />
                <FontAwesomeIcon icon={b.icon} className='w-5 h-5' />
                <span className='capitalize'>{b.label}:</span>
              </div>
              <div className='flex grow'>
                <input
                  name={b.key}
                  placeholder={b.placeholder}
                  className='settings-input !mb-0'
                  defaultValue={page.buttons[b.key]}
                  type='text'
                />
                <button
                  onClick={() => removeButton(b.key)}
                  type='button'
                  className='text-gray-700 py-2 px-4 bg-gray-300 cursor-pointer'
                >
                  <FontAwesomeIcon icon={faTrash} className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>

        {/* Available button links */}
        <div className='flex justify-center flex-wrap gap-2 mt-6 border-y py-8'>
          {availableButtons.map((b, index) => (
            <button
              key={index}
              type='button'
              onClick={() => addButtonToProfile(b)}
              className='flex items-center justify-between grow max-w-[150px] gap-1 p-2 bg-gray-200 text-gray-700'
            >
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={b.icon} className='w-5 h-5' />
                <span className='capitalize'>{b.label}</span>
              </div>
              <FontAwesomeIcon icon={faPlus} className='w-4 h-4' />
            </button>
          ))}
        </div>
        <div>
          <SubmitButton className='max-w-[200px] mx-auto mt-8'>
            <FontAwesomeIcon icon={faSave} className='w-5 h-5' />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
