import { getButtonIcon } from '@/libs/allButtons';
import { Page } from '@/models/Page';
import { User } from '@/models/User';
import { faLink, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mongoose from 'mongoose';
import Image from 'next/image';
import Link from 'next/link';

function buttonLink(key, value) {
  switch (key) {
    case 'mobile':
      return 'tel:'+value
    case 'email':
      return 'mailto:'+value
    default:
      return value
  }
}

export default async function UserPage({ params }) {
  const uri = params.uri;

  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const {
    displayName,
    location,
    bio,
    bgType,
    bgColor,
    bgImage,
    buttons,
    links,
  } = page;

  if (!page) {
    return <div>Page &quot;{uri}&quot; does not exists!</div>;
  }

  const user = await User.findOne({ email: page.owner });

  return (
    <div className='bg-blue-950 text-white min-h-screen'>
      <div
        className=' bg-gray-300 h-36 bg-cover bg-center'
        style={
          bgType === 'color'
            ? { backgroundColor: bgColor }
            : { backgroundImage: `url(${bgImage})` }
        }
      ></div>
      <div className='relative w-36 h-36 mx-auto p-2 -mt-16 rounded-full overflow-hidden'>
        <Image
          src={user.image}
          fill={true}
          className='object-cover'
          alt='avatar'
        />
      </div>
      <h2 className='text-2xl text-center my-2'>{displayName}</h2>
      <h3 className='flex justify-center items-center gap-2 text-white/70 text-md'>
        <FontAwesomeIcon icon={faLocationDot} className='w-4 h-4' />
        <span>{location}</span>
      </h3>
      <div className='max-w-xs mx-auto text-center mt-2'>
        <p>{bio}</p>
      </div>
      <div className='flex gap-2 justify-center mt-4'>
        {Object.entries(buttons).map(([k, v]) => (
          <Link
            href={buttonLink(k,v)}
            key={k}
            className='flex items-center justify-center gap-2 p-2 bg-white text-blue-950 whitespace-nowrap rounded-full font-bold'
          >
            <FontAwesomeIcon icon={getButtonIcon(k)} className='w-5 h-5' />
          </Link>
        ))}
      </div>
      <div className='grid md:grid-cols-2 gap-6 py-4 px-8 max-w-2xl mx-auto mt-4'>
        {links.map((l) => (
          <Link href={l.url} key={l.key} className='bg-indigo-800 p-2 flex'>
            <div className='relative '>
              <div className='flex items-center overflow-hidden justify-center w-16 h-16 bg-blue-700  relative -left-4 grow'>
                {l.icon ? (
                  <Image
                    src={l.icon}
                    alt='icon'
                    fill={true}
                    className='object-cover'
                  />
                ) : (
                  <FontAwesomeIcon icon={faLink} className='w-8 h-8' />
                )}
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <div>
                <h3>{l.title}</h3>
                <p className='text-white/50 h-6 overflow-hidden'>
                  {l.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
