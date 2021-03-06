import React, {useReducer} from 'react';
import Login from './Login';
import {Context} from '../core/Context';
import {checkClient} from '../helpers';
import useGlobalState from '../core/useGlobalState';
import rootReducer from '../models/rootReducer';
import rootState from '../models/rootState';
import {LoginOTPRequest, LoginRequest} from '../models/models.interface';
import {loginAction} from '../models/loginModel';
import {loginOTPAction} from '../models/loginOTPModel';
import {IMainComponent} from '../core/core.interface';

const MainComponent: IMainComponent = (_props, ref): React.ReactElement => {
  checkClient();

  const [state, dispatch] = useReducer(rootReducer, rootState);

  const {
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    loginVisible,
    setLoginVisible,
    loginOTPVisible,
    setLoginOTPVisible,
    clearState
  } = useGlobalState();

  const loginRequest = async (params: LoginRequest) => {
    await loginAction.loginRequest(dispatch, params);
  };

  const loginOTPRequest = async (params: LoginOTPRequest) => {
    await loginOTPAction.loginOTPRequest(dispatch, params);
  };

  const resetReducer = () => {
    dispatch({
      type: 'RESET'
    });
  };

  React.useImperativeHandle(ref, () => ({
    logIn: () => setLoginVisible(true)
  }));

  return (
    <Context.Provider
      value={{
        state,
        loginRequest,
        loginOTPRequest,
        resetReducer,
        phoneNumber,
        setPhoneNumber,
        countryCode,
        setCountryCode,
        loginVisible,
        setLoginVisible,
        loginOTPVisible,
        setLoginOTPVisible,
        clearState
      }}>
      <Login />
    </Context.Provider>
  );
};

export default React.forwardRef(MainComponent);
