import { NextResponse } from 'next/server';

// Mock data – replace with live API later
const mockInvestors = [
  {
    id: 'berkshire-hathaway',
    name: 'Berkshire Hathaway (BRK-A)',
    performance: [
      { date: '2010-01-01', value: 100 },
      { date: '2011-01-01', value: 110 },
      { date: '2012-01-01', value: 125 },
      { date: '2013-01-01', value: 140 },
      { date: '2014-01-01', value: 160 },
      { date: '2015-01-01', value: 170 },
      { date: '2016-01-01', value: 190 },
      { date: '2017-01-01', value: 220 },
      { date: '2018-01-01', value: 210 },
      { date: '2019-01-01', value: 240 },
      { date: '2020-01-01', value: 270 }
    ]
  },
  {
    id: 'sequoia-fund',
    name: 'Sequoia Fund (SEQUX)',
    performance: [
      { date: '2010-01-01', value: 100 },
      { date: '2011-01-01', value: 105 },
      { date: '2012-01-01', value: 115 },
      { date: '2013-01-01', value: 135 },
      { date: '2014-01-01', value: 150 },
      { date: '2015-01-01', value: 145 },
      { date: '2016-01-01', value: 160 },
      { date: '2017-01-01', value: 180 },
      { date: '2018-01-01', value: 170 },
      { date: '2019-01-01', value: 195 },
      { date: '2020-01-01', value: 210 }
    ]
  },
  {
    id: 'sp500-tr',
    name: 'S&P 500 Total Return',
    performance: [
      { date: '2010-01-01', value: 100 },
      { date: '2011-01-01', value: 112 },
      { date: '2012-01-01', value: 128 },
      { date: '2013-01-01', value: 158 },
      { date: '2014-01-01', value: 175 },
      { date: '2015-01-01', value: 178 },
      { date: '2016-01-01', value: 195 },
      { date: '2017-01-01', value: 230 },
      { date: '2018-01-01', value: 220 },
      { date: '2019-01-01', value: 260 },
      { date: '2020-01-01', value: 300 }
    ]
  }
];

export async function GET() {
  await new Promise(r => setTimeout(r, 500));
  return NextResponse.json(mockInvestors);
} 