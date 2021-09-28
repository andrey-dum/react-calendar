import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { privateRoutes, publicRoutes, RouteNames } from '../router';

export const AppRouter = () => {
  const auth = true;

  return (
    auth
      ?
        <Switch>e
          { privateRoutes.map(route =>
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )}
          <Redirect to={RouteNames.LOGIN} />

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
           <Redirect to={RouteNames.EVENT} />
        </Switch>
  )
}
