import React from 'react';
import {render} from '@testing-library/react';
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

  beforeEach(() => {
    mockedAuth = jest.spyOn(authAPI, 'me');
    authResponse = {
      data: {id: 9208, email: 'ivanklak17@gmail.com', login: 'ivanklak'},
      messages: [],
      resultCode: ResultCodes.Success,
    };
  });

  it('should be rendered', async () => {
    mockedAuth.mockReturnValue(Promise.resolve(authResponse));

    const {getByTestId, getByRole} = createTestables({});

    expect(mockedAuth).toBeCalledTimes(1);

    await new Promise(resolve => setTimeout(resolve, 100));

    const header = getByTestId('Header.Title');
    const menu = getByRole('menu');

    expect(header).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
    //
  });
});
