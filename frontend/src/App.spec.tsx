import App from './App';
import { render } from '@testing-library/react';
import React from 'react';

jest.mock('./components/person-table/PersonTable', () => 'person-table');

describe('App', () => {
  it('should render', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  })
});