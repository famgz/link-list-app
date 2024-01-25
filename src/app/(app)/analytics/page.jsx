import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Chart from '@/components/Chart';
import SectionBox from '@/components/layout/SectionBox';
import { Event } from '@/models/Event';
import { Page } from '@/models/Page';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatISO9075, isToday } from 'date-fns';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export default async function AnalyticsPage(params) {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const today = new Date();

  if (!(session && user)) {
    return redirect('/');
  }

  const page = await Page.findOne({ owner: user?.email });

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: 'view',
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: '$createdAt',
            format: '%Y-%m-%d',
          },
        },
        count: {
          $count: {},
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  /*
  const sortedGroupedViews = groupedViews.sort((a, b) =>
    a._id > b._id ? 1 : b._id > a._id ? -1 : 0
  );
  */

  const sortedGroupedViews = groupedViews.map((o) => ({
    date: o._id,
    views: o.count,
  }));

  const clicks = await Event.find({ page: page.uri, type: 'click' });

  return (
    <div>
      <SectionBox>
        <h2 className='text-xl mb-6'>Views</h2>
        <Chart data={sortedGroupedViews} />
      </SectionBox>
      <SectionBox>
        <h2 className='text-xl mb-6'>Clicks</h2>
        {page.links.map((link, index) => (
          <div
            key={link.key}
            className='flex flex-col md:flex-row gap-4 md:items-center border-t border-gray-200 py-4'
          >
            <div className='text-blue-500 pl-4'>
              <FontAwesomeIcon icon={faLink} className='w-6 h-6' />
            </div>

            <div className='grow'>
              <h3>{link.title || 'no title'}</h3>
              <p className='text-gray-700 text-sm'>
                {link.subtitle || 'no description'}
              </p>
              <a
                className='text-xs text-blue-400'
                href={link.url}
                target='_blank'
              >
                {link.url}
              </a>
            </div>

            <div className='scale-90 md:scale-100 flex justify-center gap-2 mt-2'>
              <div className='text-center'>
                <div className='border rounded-md p-2'>
                  <div className='text-3xl'>
                    {
                      clicks.filter(
                        (c) => c.uri === link.url && isToday(c.createdAt)
                      ).length
                    }
                  </div>
                  <div className='text-gray-400 text-xs uppercase font-bold whitespace-nowrap'>
                    clicks today
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <div className='border rounded-md p-2'>
                  <div className='text-3xl'>
                    {clicks.filter((c) => c.uri === link.url).length}
                  </div>
                  <div className='text-gray-400 text-xs uppercase font-bold whitespace-nowrap'>
                    clicks total
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
}
