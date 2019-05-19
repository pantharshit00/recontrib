import * as React from 'react';
import dayjs from 'dayjs';
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

const COLORS = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

interface Props {
  data: Array<WeekData>;
  gridSize?: number;
  fontSize?: string;
}

export const Recontrib: React.FC<Props> = ({
  data,
  gridSize = 10,
  fontSize = '9px',
}) => {
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
    <svg
      width={(gridSize + 4) * 54}
      height={(gridSize + 4) * 8}
      style={{ boxSizing: 'border-box' }}
    >
      <g transform="translate(10, 20)">
        {finalData.map(val => {
          return (
            <React.Fragment key={`gh-chart-val-${val.id}`}>
              <text
                x={weekCount * (gridSize + 4)}
                y={-7}
                visibility={val.weeks.length > 2 ? 'visible' : 'hidden'}
                style={{
                  fill: '#767676',
                  fontSize,
                  fontFamily: 'sans-serif',
                }}
              >
                {val.month}
              </text>
              {val.weeks.map(week => {
                return (
                  <g
                    key={`gh-chart-week-${weekCount}`}
                    transform={`translate(${weekCount++ * (gridSize + 4)},0)`}
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
                          y={idx * (gridSize + 3)}
                          fill={
                            COLORS[
                              Math.ceil(
                                (Math.min(val, 50) / 50) * COLORS.length
                              )
                            ]
                          }
                          width={gridSize}
                          height={gridSize}
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
          style={{ fill: '#767676', fontSize, fontFamily: 'sans-serif' }}
          dx="-10"
          dy={gridSize + 8}
        >
          Mon
        </text>
        <text
          style={{ fill: '#767676', fontSize, fontFamily: 'sans-serif' }}
          dx="-10"
          dy={(gridSize + 6) * 3}
        >
          Wed
        </text>
        <text
          style={{ fill: '#767676', fontSize, fontFamily: 'sans-serif' }}
          dx="-10"
          dy={(gridSize + 5) * 5}
        >
          Fri
        </text>
      </g>
    </svg>
  );
};
