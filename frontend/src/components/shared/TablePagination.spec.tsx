import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TablePagination, { TablePaginationProps } from './TablePagination';

describe('TablePagination', () => {
  const create = (props?: Partial<TablePaginationProps>) => {
    const paginationProps = {
      page: { number: 0, totalPages: 1, totalElements: 10, size: 10 },
      onSelect: jest.fn(),
      ...props
    }
    return render(<TablePagination {...paginationProps} />);
  };

  describe('render', () => {
    it('should render with 1 page', () => {
      const { container } = create();
      expect(screen.getAllByRole('listitem')).toHaveLength(5);
      expect(container).toMatchSnapshot();
    });

    it('should render first page and 3 next pages when result has 5 pages', () => {
      const { container } = create({ page: { number: 0, totalPages: 5, totalElements: 50, size: 10 } });
      expect(screen.getAllByRole('listitem')).toHaveLength(8);
      expect(container).toMatchSnapshot();
    });

    it('should render second page with 1 previous and 3 next pages when result has 5 pages', () => {
      const { container } = create({ page: { number: 1, totalPages: 5, totalElements: 50, size: 10 } });
      expect(screen.getAllByRole('listitem')).toHaveLength(9);
      expect(container).toMatchSnapshot();
    });

    it('should render second page with 1 previous and 2 next pages when result has 4 pages', () => {
      const { container } = create({ page: { number: 1, totalPages: 4, totalElements: 40, size: 10 } });
      expect(screen.getAllByRole('listitem')).toHaveLength(8);
      expect(container).toMatchSnapshot();
    });

    it('should render fifth page with 3 previous and 3 next pages when result has 10 pages', () => {
      const { container } = create({ page: { number: 4, totalPages: 10, totalElements: 100, size: 10 } });
      expect(screen.getAllByRole('listitem')).toHaveLength(11);
      expect(container).toMatchSnapshot();
    });

    it('should render last page with 3 previous when result has 10 pages', () => {
      const { container } = create({ page: { number: 9, totalPages: 10, totalElements: 100, size: 10 } });
      expect(screen.getAllByRole('listitem')).toHaveLength(8);
      expect(container).toMatchSnapshot();
    });

    it('should render second to last page with 3 previous and 1 next when result has 10 pages', () => {
      const { container } = create({ page: { number: 8, totalPages: 10, totalElements: 100, size: 10 } });
      expect(screen.getAllByRole('listitem')).toHaveLength(9);
      expect(container).toMatchSnapshot();
    });
  });

  describe('onSelect', () => {
    it('should open last page', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 0, totalPages: 10, totalElements: 100, size: 10 }, });

      const lastPageItem = screen.getByTestId("last");
      fireEvent.click(lastPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 9, totalPages: 10, totalElements: 100, size: 10 });
    });

    it('should open next page', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 0, totalPages: 10, totalElements: 100, size: 10 }, });

      const nextPageItem = screen.getByTestId("next");
      fireEvent.click(nextPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 1, totalPages: 10, totalElements: 100, size: 10 });
    });

    it('should open next page directly', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 0, totalPages: 10, totalElements: 100, size: 10 }, });

      const nextPageItem = screen.getByTestId("item-2");
      fireEvent.click(nextPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 1, totalPages: 10, totalElements: 100, size: 10 });
    });

    it('should open fourth page', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 0, totalPages: 10, totalElements: 100, size: 10 }, });

      const fourthPageItem = screen.getByTestId("item-4");
      fireEvent.click(fourthPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 3, totalPages: 10, totalElements: 100, size: 10 });
    });

    it('should open first page', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 9, totalPages: 10, totalElements: 100, size: 10 }, });

      const firstPageItem = screen.getByTestId("first");
      fireEvent.click(firstPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 0, totalPages: 10, totalElements: 100, size: 10 });
    });

    it('should open previous page', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 9, totalPages: 10, totalElements: 100, size: 10 }, });

      const previousPageItem = screen.getByTestId("prev");
      fireEvent.click(previousPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 8, totalPages: 10, totalElements: 100, size: 10 });
    });

    it('should open previous page directly', () => {
      const onSelect = jest.fn();

      create({ onSelect, page: { number: 9, totalPages: 10, totalElements: 100, size: 10 }, });

      const previousPageItem = screen.getByTestId("item-8");
      fireEvent.click(previousPageItem);
      expect(onSelect).toHaveBeenCalledWith({ number: 7, totalPages: 10, totalElements: 100, size: 10 });
    });
  });
});