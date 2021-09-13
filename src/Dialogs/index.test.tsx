import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import store from '../App/redux-store';

import Dialogs from './index';

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <Dialogs {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return {...renderResult, store};
};

describe('Dialogs Component', () => {
  it('dialogs items should be displayed', () => {
    const itemsAmount = store.getState().dialogsPage.dialogs.length;

    const {getAllByTestId} = createTestables({});

    const dialogItems = getAllByTestId(/DialogItem.User/i);

    expect(dialogItems.length).toBe(itemsAmount);
  });

  it('messages should be displayed', () => {
    const messagesAmount = store.getState().dialogsPage.messages.length;

    const {getAllByTestId} = createTestables({});

    const messages = getAllByTestId(/NewMessage.Text/i);

    expect(messages.length).toBe(messagesAmount);
  });

  it('input should change the value', () => {
    const inputValue = 'test value';

    const {getByTestId} = createTestables({});

    const input = getByTestId('NewMessage.Input');

    expect(input).not.toHaveValue();

    fireEvent.change(input, {target: {value: inputValue}});

    expect(input).toHaveValue(inputValue);
  });

  it('amount of messages should be incremented', () => {
    const inputValue = 'test value';

    const {getByTestId, getAllByTestId} = createTestables({});

    const input = getByTestId('NewMessage.Input');

    fireEvent.change(input, {target: {value: inputValue}});
    expect(input).toHaveValue(inputValue);

    const submitButton = getByTestId('NewMessage.Submit');

    fireEvent.click(submitButton);

    setTimeout(() => {
      const messages = getAllByTestId(/NewMessage.Text/i);

      expect(messages.length).toBe(6);
    }, 0);
  });
});
