import React from 'react';
import { Calendar, Layout, Row } from 'antd';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';

interface IProps {
  events: IEvent[];
}


export const EventCalendar: React.FC<IProps> = ({events}) => {

  function dateCellRender(value: Moment) {
  const formatedDate = formatDate(value.toDate());
  const currentDayEvents = events.filter(event => event.date === formatedDate);
  return (
    <div>
      { currentDayEvents.map((ev, index) => (
        <div key={index}>{ ev.description }</div>
      )) }
    </div>
  );
}


  return (
    <Layout>
      <Calendar
        dateCellRender={dateCellRender}
      />
    </Layout>
  );
}

