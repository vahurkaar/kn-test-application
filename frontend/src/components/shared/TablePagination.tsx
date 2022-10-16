import { Pagination } from 'react-bootstrap';
import React from 'react';
import Page from '../../models/Page';
import { observer } from 'mobx-react';

export interface TablePaginationProps {
  page: Page,
  onSelect: (page: Page) => void;
}

const TablePagination = observer(({ page, onSelect }: TablePaginationProps) => {
  const currentPage = page.number + 1;
  const goToPage = (number: number) => onSelect({ ...page, number });
  const goToFirstPage = () => goToPage(0);
  const goToLastPage = () => goToPage(page.totalPages - 1);
  const goToNext = () => goToPage(page.number + 1);
  const goToPrevious = () => goToPage(page.number - 1);

  const isNextEnabled = page.number < page.totalPages - 1;
  const isPrevEnabled = page.number > 0;

  const renderPreviousItems = (currentPage: number, maxItems: number) => {
    const items = [];
    for (let pageNumber = Math.max(1, currentPage - maxItems); pageNumber < currentPage; pageNumber++) {
      items.push(<Pagination.Item data-testid={`item-${pageNumber}`} key={`prev-${pageNumber}`} onClick={() => goToPage(pageNumber - 1)}>{pageNumber}</Pagination.Item>);
    }

    return items;
  }

  const renderNextItems = (currentPage: number, maxItems: number) => {
    const items = [];
    for (let pageNumber = Math.min(page.totalPages, currentPage + maxItems); pageNumber > currentPage; pageNumber--) {
      items.push(<Pagination.Item data-testid={`item-${pageNumber}`} key={`next-${pageNumber}`} onClick={() => goToPage(pageNumber - 1)}>{pageNumber}</Pagination.Item>);
    }

    items.reverse();
    return items;
  }

  return (
    <Pagination size="sm" className="justify-content-center">
      <Pagination.First data-testid="first" disabled={!isPrevEnabled} onClick={goToFirstPage} />
      <Pagination.Prev data-testid="prev" disabled={!isPrevEnabled} onClick={goToPrevious} />

      {renderPreviousItems(currentPage, 3)}
      <Pagination.Item data-testid={`item-${currentPage}`} active>{currentPage}</Pagination.Item>
      {renderNextItems(currentPage, 3)}

      <Pagination.Next data-testid="next" disabled={!isNextEnabled} onClick={goToNext} />
      <Pagination.Last data-testid="last" disabled={!isNextEnabled} onClick={goToLastPage} />
    </Pagination>
  );
});

export default TablePagination;