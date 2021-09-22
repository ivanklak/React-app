import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import store from '../App/redux-store';

import Dialogs from '../Dialogs';

const inputValue = 'test value';
const itemsAmount = store.getState().dialogsPage.dialogs.length;
const messagesAmount = store.getState().dialogsPage.messages.length;

const createTestables = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Dialogs />
      </Provider>
    </BrowserRouter>,
  );

describe('Dialogs Component', () => {
  it('dialogs items should be displayed', () => {
    const {getAllByTestId} = createTestables();

    const dialogItems = getAllByTestId(/DialogItem.User/i);

    expect(dialogItems.length).toBe(itemsAmount);
  });

  it('messages should be displayed', () => {
    const {getAllByTestId} = createTestables();

    const messages = getAllByTestId(/NewMessage.Text/i);

    expect(messages.length).toBe(messagesAmount);
  });

  it('input should change the value', () => {
    const {getByTestId} = createTestables();

    const input = getByTestId('NewMessage.Input');

    expect(input).not.toHaveValue();

    fireEvent.change(input, {target: {value: inputValue}});

    expect(input).toHaveValue(inputValue);
  });

  it('amount of messages should be incremented', async () => {
    const {getByTestId, findByTestId} = createTestables();

    const input = getByTestId('NewMessage.Input');

    fireEvent.change(input, {target: {value: inputValue}});
    expect(input).toHaveValue(inputValue);

    const submitButton = getByTestId('NewMessage.Submit');

    fireEvent.click(submitButton);

    const newMessage = await findByTestId('NewMessage.Text.6');

    expect(newMessage).toBeInTheDocument();
  });
});
