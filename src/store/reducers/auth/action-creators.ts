import { AppDispatch } from './../../index';
import { AuthActionEnum, SetUserAction, SetAuthAction, SetIsLoadingAction, SetErrorAction } from './types';
import { IUser } from './../../../models/IUser';
import axios from 'axios';



export const AuthActionCreators = {

  setUser: (user: IUser): SetUserAction => (
    {
      type: AuthActionEnum.SET_USER,
      payload: user
    }
  ),

  setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
  setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout(async () => {
        const response = await axios.get<IUser[]>('./users.json')
        const user = response.data.find((user: IUser) => user.username === username && user.password === password)
        if (user) {
          localStorage.setItem('isAuth', 'true')
          localStorage.setItem('user', user.username)

          dispatch(AuthActionCreators.setUser(user))
          dispatch(AuthActionCreators.setIsAuth(true))
        } else {
          dispatch(AuthActionCreators.setError('User not found'));

        }
      }, 1000)
      dispatch(AuthActionCreators.setIsLoading(false));
    } catch (error) {
      dispatch(AuthActionCreators.setError('Error'));
      dispatch(AuthActionCreators.setIsLoading(false));
    }
  },

  logout: () => (dispatch: AppDispatch) => {
    localStorage.removeItem('isAuth')
    localStorage.removeItem('user')
    dispatch(AuthActionCreators.setIsAuth(false))
    dispatch(AuthActionCreators.setUser({} as IUser))
  }

}