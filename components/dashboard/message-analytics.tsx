'use client';

import dayjs from 'dayjs/esm';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

function MessageAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">
          Message analytics
        </CardTitle>
        <CardDescription>
          Messages sent per day in the last week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={450}
        >
          <AreaChart
            data={[
              {
                date: '2021-08-01',
                total: 100,
              },
              {
                date: '2021-08-02',
                total: 200,
              },
              {
                date: '2021-08-03',
                total: 70,
              },
              {
                date: '2021-08-04',
                total: 140,
              },
              {
                date: '2021-08-05',
                total: 200,
              },
              {
                date: '2021-08-06',
                total: 500,
              },
              {
                date: '2021-08-07',
                total: 400,
              },
            ]}
          >
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(date) => {
                return dayjs(date).format('ddd');
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Area
              dataKey="total"
              fill="#5C6FEE"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default MessageAnalytics;
