import React from 'react';
import { PieChart, Pie } from 'recharts';

const Dashboard = () => {
  const data01 = [
    {
      name: 'Group A',
      value: 400,
    },
    {
      name: 'Group B',
      value: 300,
    },
    {
      name: 'Group C',
      value: 300,
    },
    {
      name: 'Group D',
      value: 200,
    },
    {
      name: 'Group E',
      value: 278,
    },
    {
      name: 'Group F',
      value: 189,
    },
  ];
  const data02 = [
    {
      name: 'Group A',
      value: 5,
    },
    {
      name: 'Group B',
      value: 7,
    },
    {
      name: 'Group C',
      value: 0,
    },
    {
      name: 'Group D',
      value: 0,
    },
    {
      name: 'Group E',
      value: 1,
    },
    {
      name: 'Group F',
      value: 3,
    },
  ];
  return (
    <>
      <h2 className='page-title'>Dashboard</h2>
      <div className='dashboard'>
        <div className='piechart'>
          <h3 className='piechart__title'> Teaching method distribution</h3>
          <PieChart height={200} width={250} className='piechart__pie'>
            <Pie
              data={data02}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={60}
              fill='#2196f3'
              label
            />
          </PieChart>
          <div className='piechart__key'>
            <div className='piechart__key__item'></div>
            <span>teaching method</span>
          </div>
        </div>
        <div className='piechart'>
          <h3 className='piechart__title'> Teaching methods</h3>
          <PieChart height={200} width={250} className='piechart__pie'>
            <Pie
              data={data02}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={60}
              fill='#2196f3'
              label
            />
          </PieChart>
          <div className='piechart__key'>
            <div className='piechart__key__item'></div>
            <span>teaching method</span>
          </div>
        </div>
        <div className='piechart'>
          <h3 className='piechart__title'>
            {' '}
            Course conducted as per timetable
          </h3>
          <PieChart height={200} width={250} className='piechart__pie'>
            <Pie
              data={data02}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={60}
              fill='#2196f3'
              label
            />
          </PieChart>
          <div className='piechart__key'>
            <div className='piechart__key__item'></div>
            <span>teaching method</span>
          </div>
        </div>
        <div className='piechart'>
          <h3 className='piechart__title'>
            {' '}
            reason for not conducting classes
          </h3>
          <PieChart height={200} width={250} className='piechart__pie'>
            <Pie
              data={data02}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={60}
              fill='#2196f3'
              label
            />
          </PieChart>
          <div className='piechart__key'>
            <div className='piechart__key__item'></div>
            <span>teaching method</span>
          </div>
        </div>
        <div className='piechart'>
          <h3 className='piechart__title'>
            {' '}
            actual starting time of assessed courses
          </h3>
          <PieChart height={200} width={250} className='piechart__pie'>
            <Pie
              data={data02}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={60}
              fill='#2196f3'
              label
            />
          </PieChart>
          <div className='piechart__key'>
            <div className='piechart__key__item'></div>
            <span>teaching method</span>
          </div>
        </div>
        {/* <div className='piechart'>
          <div className='piechart__title'> Teaching method</div>
          <PieChart height={250} width={300}>
            <Pie
              data={data01}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={50}
              fill='#2196f3'
            />
            <Pie
              data={data02}
              dataKey='value'
              nameKey={'name'}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              fill='#82ca9d'
              label
            />
          </PieChart>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
