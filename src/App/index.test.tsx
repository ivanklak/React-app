import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import {authAPI} from '../Authentication/services';

import App from '../App';

import {mockMeResponse, reduxStore} from './helpers/test';

const meResponse = mockMeResponse();
const store = reduxStore();

const createTestables = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );

describe('App Component', () => {
  const mockedAuth: jest.SpyInstance = jest.spyOn(authAPI, 'me');

  it('should be rendered', async () => {
    mockedAuth.mockReturnValue(Promise.resolve(meResponse));

    const {getByTestId, getByRole} = createTestables();

    await wait(() => expect(mockedAuth).toHaveBeenCalledTimes(1));

    const header = getByTestId('Header.Title');
    const menu = getByRole('menu');

    expect(header).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
  });
});
