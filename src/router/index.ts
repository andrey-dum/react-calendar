import { Login, Event } from './../pages';
import React from 'react';


export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/login',
  EVENT = '/',
}


export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    component: Login,
    exact: true,
  }
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.EVENT,
    component: Event,
    exact: true,
  }
]