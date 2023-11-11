import {
  Column,
  ColumnDef,
  HeaderGroup,
  Row,
  RowModel,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import _ from 'lodash';
import { Fragment } from 'react';
import { Table } from 'reactstrap';

interface TableContainerProps<TData, TValue = keyof TData> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  tableClass: string;
  theadClass: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  pagination?: boolean;
  onToggleSort?: (id: string) => void;
}

const TableContainer = <TData, TValue = keyof TData>({
  columns,
  data,
  pageSize,
  tableClass,
  theadClass,
  sortBy,
  order = 'asc',
  onToggleSort,
  pagination = false,
}: TableContainerProps<TData, TValue>) => {
  // Legacy react-table v7
  /*
    const tableHook: TableInstance<D> = useTable<D>(
      {
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: {
          pageIndex: 0,
          pageSize: pageSize > 0 ? pageSize : 20,
        },
      },
      useGlobalFilter,
      useFilters,
      useSortBy,
      useExpanded,
      usePagination,
      useRowSelect
    );
  */

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getColumnCanGlobalFilter: (column: Column<TData>) => column.getCanGlobalFilter(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    initialState: {
      pagination: pagination
        ? {
            pageIndex: 0,
            pageSize: pageSize && pageSize > 0 ? pageSize : data.length > 0 ? data.length : 20,
          }
        : {},
    },
  });

  // Legacy react-table v7
  // const { page, getTableProps, getTableBodyProps, headerGroups, prepareRow } = tableHook;

  const { getHeaderGroups, getRowModel } = tableInstance;

  const headerGroups: HeaderGroup<TData>[] = getHeaderGroups();
  const rowModel: RowModel<TData> = getRowModel();

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(data?.length); i++) {
    pageNumbers.push(i);
  }

  const generateSortingIndicator = <DT,>(column: Column<DT>) => {
    return sortBy === column.id ? (
      order && order === 'desc' ? (
        <span>&#9650;</span>
      ) : (
        <span>&#9660;</span>
      )
    ) : (
      ''
    );
  };

  return (
    <div className='table-responsive'>
      <Table hover role='table' className={tableClass}>
        <thead role='rowheader' className={theadClass}>
          {headerGroups.map((headerGroup: HeaderGroup<TData>) => (
            <tr role='row' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.column.id} colSpan={header.colSpan} className={`sorting_asc`}>
                  <div
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (onToggleSort) onToggleSort(_.toString(header.id));
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {generateSortingIndicator(header.column)}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div>{/* <Filter column={header.column} table={table} /> */}</div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {rowModel.rows.map((row: Row<TData>) => {
            return (
              <Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={_.toString(cell.id)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableContainer;
