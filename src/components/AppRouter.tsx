import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

export const AppRouter = () => {
  const { isAuth } = useTypedSelector(state => state.auth)

  return (
    isAuth
      ?
        <Switch>
          { privateRoutes.map(route =>
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )}
          <Redirect to={RouteNames.EVENT} />

        </Switch>
      :
        <Switch>
          { publicRoutes.map(route =>
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )}
           <Redirect to={RouteNames.LOGIN} />
        </Switch>
  )
}
