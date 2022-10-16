import PersonTable from './PersonTable';
import { render } from '@testing-library/react';
import React from 'react';
import PersonTableStore from './PersonTableStore';

jest.mock('./PersonTableStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../shared/TablePagination', () => 'table-pagination');
jest.mock('../shared/SearchField', () => 'search-field');

describe('PersonTable', () => {
  const create = (props: Partial<PersonTableStore> = {}) => {
    const store: Partial<PersonTableStore> = {
      init: jest.fn(),
      isInitialized: true,
      people: [{
        name: 'name',
        suffix: 'suffix',
        url: 'url'
      }, {
        name: 'name without suffix',
        url: 'url-2'
      }],
      page: {
        number: 0,
        totalPages: 10,
        totalElements: 100,
        size: 10
      },
      ...props
    };

    // @ts-ignore
    PersonTableStore.mockImplementation(() => {
      return {
        ...store
      };
    });

    const rendered = render(<PersonTable/>);
    return { rendered, store };
  };

  it('should render', () => {
    const { rendered: { container }, store } = create();
    expect(container).toMatchSnapshot();
    expect(store.init).toHaveBeenCalled();
  });

  it('should render empty list', () => {
    const { rendered: { container }, store } = create({ people: [] });
    expect(container).toMatchSnapshot();
    expect(store.init).toHaveBeenCalled();
  });

  it('should render spinner', () => {
    const { rendered: { container }, store } = create({ isInitialized: false });
    expect(container).toMatchSnapshot();
    expect(store.init).toHaveBeenCalled();
  });

  it('should render alert', () => {
    const { rendered: { container } } = create({ hasErrors: true });
    expect(container).toMatchSnapshot();
  });
});