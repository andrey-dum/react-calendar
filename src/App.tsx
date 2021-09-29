import React, { useEffect } from 'react';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';
import { Layout } from 'antd';
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';


function App() {
  const {setUser, setIsAuth} = useActions()

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth')
    const username = localStorage.getItem('user')

    if (isAuth) {
      setUser({username: username || ''} as IUser )
      setIsAuth(true)
    }

  }, []);

  return (
    <Layout>
      <Navbar />

      <Layout.Content>
        <AppRouter />
      </Layout.Content>

    </Layout>
  );
}

export default App;
