import _ from 'lodash';
import React, { Dispatch, useMemo } from 'react';
import { Row, PaginationItem, PaginationLink } from 'reactstrap';

type PaginationProps = {
  count: number;
  maxView?: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: Dispatch<number>;
};

const DOTS = -1;

const Pagination = ({
  count,
  maxView = 3,
  pageSize,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pagination = true;
  const pageNumbers = Array(Math.ceil(count / pageSize))
    .fill(0)
    .map((_value, index) => index + 1);

  const setPage = (number: number) => {
    if (number > 0 && number <= pageNumbers.length) {
      setCurrentPage(number);
    }
  };

  const findPageNumbersWithDots = useMemo(() => {
    const pageNumbersWithDots: number[] = [];
    const totalPageNumbers: number = maxView + 2;

    if (pageNumbers.length <= totalPageNumbers) {
      pageNumbersWithDots.push(...pageNumbers);
    } else {
      const leftBound: number = currentPage - Math.floor(maxView / 2);
      const rightBound: number = currentPage + Math.floor(maxView / 2);

      const leftDotsBound: number = currentPage - Math.ceil(maxView / 2) + 2;
      const rightDotsBound: number = currentPage + Math.ceil(maxView / 2) - 2;

      for (let i = 0; i < pageNumbers.length; i++) {
        if (i + 1 === 1 || i + 1 === pageNumbers.length) {
          pageNumbersWithDots.push(pageNumbers[i]);
        } else if (i + 1 >= leftDotsBound && i + 1 <= rightDotsBound) {
          pageNumbersWithDots.push(pageNumbers[i]);
        } else if (i + 1 === leftBound || i + 1 === rightBound) {
          pageNumbersWithDots.push(pageNumbers[i]);
        } else if (pageNumbersWithDots[pageNumbersWithDots.length - 1] !== DOTS) {
          pageNumbersWithDots.push(DOTS);
        }
      }
    }

    return pageNumbersWithDots;
  }, [pageNumbers, currentPage, maxView]);

  return (
    <React.Fragment>
      {!count && (
        <div id='noresult'>
          <div className='text-center py-4'>
            <div className='avatar-md mx-auto mb-4'>
              <div className='avatar-title bg-light text-primary rounded-circle fs-4xl'>
                <i className='bi bi-search'></i>
              </div>
            </div>
            <h5 className='mt-2'>Không tìm thấy</h5>
          </div>
        </div>
      )}

      {pagination ? (
        <Row
          className='justify-content-between align-items-center mb-3'
          id='pagination-element'
          style={{ display: 'flex' }}
        >
          <div className='clo-auto'>
            <ul className='pagination pagination-rounded justify-content-end mb-2'>
              {currentPage <= 1 ? (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    previous
                    className='page-item disabled pagination-prev'
                  ></PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem
                  className={
                    currentPage <= 1
                      ? 'page-item disabled pagination-prev'
                      : 'page-item pagination-prev'
                  }
                >
                  <PaginationLink
                    href='#'
                    previous
                    onClick={() => setPage(currentPage - 1)}
                  ></PaginationLink>
                </PaginationItem>
              )}

              <div className='pagination pagination-rounded justify-content-center'>
                {(findPageNumbersWithDots || []).map((item: number, key: number) => (
                  <PaginationItem className={currentPage === item ? 'active ' : ''} key={key}>
                    {item !== DOTS ? (
                      <PaginationLink
                        className='page'
                        href='#'
                        key={key}
                        id={_.toString(item)}
                        onClick={(e) => setPage(Number(e.currentTarget.id))}
                      >
                        {item}
                      </PaginationLink>
                    ) : (
                      <PaginationLink
                        className='page'
                        href='#'
                        key={key}
                        id={_.toString(item)}
                        onClick={() => {}}
                      >
                        ...
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
              </div>
              <PaginationItem>
                <PaginationLink
                  href='#'
                  next
                  className={
                    currentPage >= pageNumbers.length
                      ? 'page-item disabled pagination-next'
                      : 'page-item pagination-next'
                  }
                  onClick={() => setPage(currentPage + 1)}
                ></PaginationLink>
              </PaginationItem>
            </ul>
          </div>
        </Row>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default Pagination;
