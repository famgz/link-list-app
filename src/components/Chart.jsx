'use client';

import { addDays, differenceInDays, formatISO9075, parseISO } from 'date-fns';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function Chart({ data }) {
  const xLabelKey = Object.keys(data[0]).find((key) => key !== 'date');

  const fullDaysRangeData = [];
  data.forEach((value, index) => {
    const date = value.date;
    fullDaysRangeData.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });

    const nextDate = data?.[index + 1]?.date;

    if (!(date && nextDate)) {
      return;
    }

    const daysBetween = Math.abs(differenceInDays(date, nextDate));
    if (!daysBetween) {
      return;
    }

    for (let i = 1; i < daysBetween; i++) {
      const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(
        ' '
      )[0];
      fullDaysRangeData.push({
        date: dateBetween,
        [xLabelKey]: 0,
      });
    }
  });

  return (
    <div>
      <ResponsiveContainer width='100%' height={200} >
        <LineChart
          width={730}
          height={250}
          data={fullDaysRangeData}
          margin={{ top: 5, right: 20, left: -15, bottom: 5 }}
        >
          <CartesianGrid vertical={false} strokeWidth='2' stroke='#f5f5f5' />
          <XAxis
            dataKey='date'
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: '#aaa' }}
            fontSize={12}
            />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: '#aaa' }}
            fontSize={12}
          />
          <Tooltip />
          <Line
            type='monotone'
            dataKey={xLabelKey}
            strokeWidth='2'
            stroke='#09f'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
