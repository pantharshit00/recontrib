import * as React from 'react';
import dayjs from 'dayjs';
import { LightenDarkenColor } from './utils/darkenColor';
import { TriangleTooltip } from './utils/ToolTip';

interface WeekData {
  days: number[];
  total: number;
  week: number;
}

interface Data {
  month: string;
  id: string;
  weeks: Array<WeekData>;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const ZERO_COLOR = '#ebedf0';
const BASE_GREEN_COLOR = '#7bc96f';

export const Recontrib: React.FC<{ data: Array<WeekData> }> = ({ data }) => {
  const finalData = React.useMemo(() => {
    let massagedData: Array<Data> = [];

    data.forEach(history => {
      const month = dayjs.unix(history.week).get('month');
      const year = dayjs.unix(history.week).get('year');
      const monthIndex = massagedData.findIndex(
        d => d.id === `${MONTHS[month]}${year}`
      );
      if (monthIndex === -1) {
        massagedData.push({
          month: MONTHS[month],
          weeks: [history],
          id: `${MONTHS[month]}${year}`,
        });
      } else {
        massagedData[monthIndex].weeks.push(history);
      }
    });
    return massagedData;
  }, [data]);

  let weekCount = 1;
  return (
    <svg width="748" height="112" style={{ boxSizing: 'border-box' }}>
      <g transform="translate(10, 20)">
        {finalData.map(val => {
          return (
            <React.Fragment key={`gh-chart-val-${val.id}`}>
              <text
                x={weekCount * 14}
                y={-7}
                style={{
                  fill: '#767676',
                  fontSize: '9px',
                  fontFamily: 'sans-serif',
                }}
              >
                {val.month}
              </text>
              {val.weeks.map(week => {
                return (
                  <g
                    key={`gh-chart-week-${weekCount}`}
                    transform={`translate(${weekCount++ * 14},0)`}
                  >
                    {week.days.map((val, idx) => (
                      <TriangleTooltip
                        key={`gh-chart-week-${weekCount}-day-${idx}`}
                        label={`${
                          val === 0
                            ? 'No contribution'
                            : `${val} commit${val !== 1 ? 's' : ''}`
                        } on ${dayjs
                          .unix(week.week)
                          .day(idx)
                          .format('MMMM D, YYYY')}`}
                      >
                        <rect
                          id={`gh-chart-week-${weekCount}-day-${idx}`}
                          x={0}
                          y={idx * 13}
                          fill={
                            val === 0
                              ? ZERO_COLOR
                              : LightenDarkenColor(BASE_GREEN_COLOR, -val)
                          }
                          width={10}
                          height={10}
                        />
                      </TriangleTooltip>
                    ))}
                  </g>
                );
              })}
            </React.Fragment>
          );
        })}
        <text
          style={{ fill: '#767676', fontSize: '9px', fontFamily: 'sans-serif' }}
          dx="-10"
          dy="22"
        >
          Mon
        </text>
        <text
          style={{ fill: '#767676', fontSize: '9px', fontFamily: 'sans-serif' }}
          dx="-10"
          dy="48"
        >
          Wed
        </text>
        <text
          style={{ fill: '#767676', fontSize: '9px', fontFamily: 'sans-serif' }}
          dx="-10"
          dy="73"
        >
          Fri
        </text>
      </g>
    </svg>
  );
};
