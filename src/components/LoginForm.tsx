import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { rules } from '../utils/rules';
import { useActions } from '../hooks/useActions';

export const LoginForm = () => {
  const { error, isLoading } = useTypedSelector(state => state.auth)
  // const dispatch = useDispatch()
  const { login } = useActions()


  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = () => {
    // dispatch(AuthActionCreators.login(username, password))
    login(username, password);
  }

  return (
     <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      {error && <div style={{color: 'red'}}>{error}</div>}
      <Form.Item
        label="Username"
        name="username"
        rules={[rules('Please input your username!')]}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules('Please input your password!')]}
      >
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>

    </Form>
  );
}

