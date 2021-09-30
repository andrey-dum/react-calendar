import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Row } from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';
const { Option } = Select;

interface IProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

export const EventForm: React.FC<IProps> = ({ guests, submit }) => {

  const {user} = useTypedSelector(state => state.auth)


  const [event, setEvent] = useState<IEvent>({
    author: '',
    guest: '',
    date: '',
    description: ''
  } as IEvent);


  const onChangeDate = (date: Moment | null) => {
    if(date) {
      const formatedDate = formatDate(date.toDate())
      setEvent({...event, date: formatedDate})
    }
  }

  const onSubmit = () => {
    submit({...event, author: user.username});

  }


  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        label="Название"
        name="description"
        rules={[rules.required('Введите название!')]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({...event, description: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        label="Дата"
        name="date"
        rules={[rules.required(), rules.isDateAfter('Неверная дата')]}
      >
        <DatePicker
          onChange={(date) => onChangeDate(date)}
        />
      </Form.Item>
      <Form.Item
        label="Гость"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest: string) => setEvent({...event, guest})}>
          {  guests &&  guests.map(guest => (
            <Option value={guest.username} key={guest.username}>{guest.username}</Option>
          ))}
          </Select>
      </Form.Item>

       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
}

