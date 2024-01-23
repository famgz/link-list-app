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
  faEnvelope,
  faMobile
} from '@fortawesome/free-solid-svg-icons';

export const allButtons = [
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

export function getButtonIcon(key) {
  return allButtons.find(b => b.key === key)?.icon
}