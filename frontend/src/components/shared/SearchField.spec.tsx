import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchField, { SearchFieldProps } from './SearchField';

describe('SearchField', () => {
  const create = (props?: Partial<SearchFieldProps>) => {
    const searchFieldProps = {
      label: 'Default Label',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ...props
    }
    render(<SearchField {...searchFieldProps} />);
  };

  it('should render', () => {
    create();

    const inputField = screen.getByPlaceholderText('Default Label');
    expect(inputField).toBeDefined();
  });

  it('should call onChange', () => {
    const onChangeCallback = jest.fn();
    create({ label: 'Default Label', onChange: onChangeCallback});

    const inputField = screen.getByPlaceholderText('Default Label');
    fireEvent.change(inputField, {
      target: { value: 'value' }
    });

    expect(onChangeCallback).toHaveBeenCalledWith('value');
  })
});
