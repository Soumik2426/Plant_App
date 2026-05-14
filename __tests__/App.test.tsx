/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
}));

jest.mock('../navigation/AppNavigator', () => {
  const { createElement } = require('react');
  const { View, Text } = require('react-native');

  return function MockAppNavigator() {
    return createElement(
      View,
      null,
      createElement(Text, null, 'MockAppNavigator')
    );
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
