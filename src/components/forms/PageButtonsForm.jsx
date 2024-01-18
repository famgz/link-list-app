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

const allButtons = [
  {
    key: 'email',
    label: 'e-mail',
    icon: faEnvelope,
    placeholder: 'example@example.com',
  },
  {
    key: 'mobile',
    label: 'mobile',
    icon: faMobile,
    placeholder: '+12 3456 7890',
  },
  {
    key: 'instagram',
    label: 'instagram',
    icon: faInstagram,
    placeholder: 'https://www.instagram.com/your_instagram_username/',
  },
  {
    key: 'linkedin',
    label: 'linkedin',
    icon: faLinkedin,
    placeholder: 'https://www.linked.com/in/your_linkedin_username/',
  },
  {
    key: 'facebook',
    label: 'facebook',
    icon: faFacebook,
    placeholder: 'https://www.facebook.com/your_facebook_username/',
  },
  {
    key: 'discord',
    label: 'discord',
    icon: faDiscord,
    placeholder: 'YourDiscord#1234',
  },
  {
    key: 'tiktok',
    label: 'tiktok',
    icon: faTiktok,
    placeholder: 'https://www.tiktok.com/@your_tiktok_username/',
  },
  {
    key: 'snapchat',
    label: 'snapchat',
    icon: faTiktok,
    placeholder: 'https://www.snapchat.com/add/your_snapchat_username',
  },
  {
    key: 'youtube',
    label: 'youtube',
    icon: faYoutube,
    placeholder: 'https://www.youtube.com/c/YourYouTubeChannel',
  },
  {
    key: 'whatsapp',
    label: 'whatsapp',
    icon: faWhatsapp,
    placeholder: '+12 3456 7890',
  },
  {
    key: 'github',
    label: 'github',
    icon: faGithub,
    placeholder: 'https://github.com/your_github_username',
  },
  {
    key: 'twitter',
    label: 'twitter',
    icon: faTwitter,
    placeholder: 'https://twitter.com/your_twitter_handle',
  },
  {
    key: 'twitch',
    label: 'twitch',
    icon: faTwitch,
    placeholder: 'https://www.twitch.tv/your_twitch_username',
  },
  {
    key: 'steam',
    label: 'steam',
    icon: faSteam,
    placeholder: '@username',
  },
  {
    key: 'telegram',
    label: 'telegram',
    icon: faTelegram,
    placeholder: 'https://t.me/your_telegram_username',
  },
  {
    key: 'pinterest',
    label: 'pinterest',
    icon: faPinterest,
    placeholder: 'https://pinterest.com/your_pinterest_username',
  },
  {
    key: 'reddit',
    label: 'reddit',
    icon: faReddit,
    placeholder: 'https://reddit.com/user/your_reddit_username',
  },
  {
    key: 'skype',
    label: 'skype',
    icon: faSkype,
    placeholder: 'skype:yourskypename?call',
  },
];

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

  function removeButton({ key: keyToRemove }) {
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
            <div key={b.key} className='flex items-center mb-4'>
              <div className='w-52 flex gap-1 items-center text-gray-700'>
                <FontAwesomeIcon
                  icon={faArrowsUpDown}
                  className='sortable-handle'
                />
                <FontAwesomeIcon icon={b.icon} className='w-5 h-5' />
                <span className='capitalize'>{b.label}:</span>
              </div>
              <input
                name={b.key}
                placeholder={b.placeholder}
                className='settings-input !mb-0'
                defaultValue={page.buttons[b.key]}
                type='text'
              />
              <button
                onClick={() => removeButton(b)}
                type='button'
                className='text-gray-700 py-2 px-4 bg-gray-300 cursor-pointer'
              >
                <FontAwesomeIcon icon={faTrash} className='w-4 h-4' />
              </button>
            </div>
          ))}
        </ReactSortable>

        {/* Available button links */}
        <div className='flex flex-wrap gap-2 mt-6 border-y py-8'>
          {availableButtons.map((b, index) => (
            <button
              key={index}
              type='button'
              onClick={() => addButtonToProfile(b)}
              className='flex items-center gap-1 p-2 bg-gray-200 text-gray-700'
            >
              <FontAwesomeIcon icon={b.icon} className='w-5 h-5' />
              <span className='capitalize'>{b.label}</span>
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
