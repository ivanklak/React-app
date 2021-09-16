import React from 'react';
//@ts-ignore
import {render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import {authAPI, IMeResponse} from '../Authentication/services';

import store from './redux-store';
import {ResultCodes} from './services/api';

import App from './index';

let authResponse: IMeResponse;

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <App {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return renderResult;
};

describe('App Component', () => {
  let mockedAuth: jest.SpyInstance;
  const dispatch = store.dispatch;

  beforeEach(() => {
    mockedAuth = jest.spyOn(authAPI, 'me');
    store.dispatch = jest.fn(dispatch);
    authResponse = {
      data: {id: 999, email: 'test@gmail.com', login: 'testLogin'},
      messages: [],
      resultCode: ResultCodes.Success,
    };
  });

  it('should be rendered', async () => {
    mockedAuth.mockReturnValue(Promise.resolve(authResponse));

    const {getByTestId, getByRole} = createTestables({});

    await wait(() => expect(mockedAuth).toHaveBeenCalledTimes(1));

    const header = getByTestId('Header.Title');
    const menu = getByRole('menu');

    expect(header).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
  });
});
