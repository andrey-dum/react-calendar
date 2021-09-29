import React from 'react';
import { Layout, Row, Menu, Avatar } from 'antd';
import { RouteNames } from '../router';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';

export const Navbar = () => {
  const history = useHistory();
  const { isAuth, user } = useTypedSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <Layout.Header>
      <Row justify="end" align="middle">
        {
          isAuth
            ?
            <>
            { user && <><Avatar /> <div style={{color: "white", padding: " 0 15px"}}>{user.username}</div> </> }
            <Menu theme="dark" selectable={false}>
              <Menu.Item
                key={1}
                onClick={() => dispatch(AuthActionCreators.logout())}
              >
                  Logout
                </Menu.Item>
            </Menu>
            </>
            :
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item
                onClick={() => history.push(RouteNames.LOGIN)}
                key={1}
              >
                  Login
                </Menu.Item>
            </Menu>
        }

      </Row>
    </Layout.Header>
  );
}

