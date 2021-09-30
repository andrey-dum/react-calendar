import { Button, Layout, Modal, Row } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { EventCalendar } from '../components/EventCalendar';
import { EventForm } from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

export const Event: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions()
  const { guests, events } = useTypedSelector(state => state.event)
  const { user } = useTypedSelector(state => state.auth)

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addNewEvent = (event: IEvent) => {
    setIsModalVisible(false);
    createEvent(event)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center" style={{padding: 20}}>
        <Button type="primary" onClick={showModal}>
          Добавить событие
        </Button>
        <Modal title="Добавить событие" visible={isModalVisible} footer={false} onOk={handleOk} onCancel={handleCancel}>
          <EventForm
            guests={guests}
            submit={addNewEvent}
          />
        </Modal>
      </Row>
    </Layout>
  );
}
