import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {SignInContainer} from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockSubmit = jest.fn();
      const {getByTestId} = render(<SignInContainer onSubmit={mockSubmit}/>);
      
      fireEvent.changeText(getByTestId('usernameInput'), 'kalle');
      fireEvent.changeText(getByTestId('passwordInput'), 'password');
      fireEvent.press(getByTestId('loginSubmitButton'));
      await waitFor(() => {
        expect(mockSubmit.mock.calls).toHaveLength(1);
        expect(mockSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});