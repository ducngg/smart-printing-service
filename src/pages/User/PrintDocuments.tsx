import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';

//Import Breadcrumb
import TableContainer from 'Components/Common/TableContainer';
import { printRequests, printers } from 'data';
import useTitle from 'hooks/useTitle';
import { Document, PrintRequest, Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const PrintDocuments = () => {
  const [requests] = useState<PrintRequest[]>(printRequests);

  const [sortBy, setSortBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onToggleSort = (id: string) => {
    if (sortBy !== id) {
      setSortBy(id);
      setOrder('asc');
    } else if (order === 'asc') {
      setOrder('desc');
    } else {
      setSortBy('');
      setOrder('asc');
    }
  };

  useTitle('Print Documents', {
    restoreOnUnmount: true,
  });

  const columns = useMemo<ColumnDef<PrintRequest, any>[]>(
    () => [
      {
        header: 'Requests ID',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'File name(s)',
        accessorKey: 'files',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const files = cellProps.getValue() as Document[];
          const filenames = files.reduce((acc, file) => {
            return `${acc}${file.name}, `;
          }, '');
          if (files.length > 0) return <div>{filenames.slice(0, -2)}</div>;
          return <div>{filenames}</div>;
        },
      },
      {
        header: 'File count',
        accessorKey: 'fileCount',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Total Page Count',
        accessorKey: 'pageCount',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Sent at',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const date = cellProps.getValue() as number;
          return <div>{new Date(date).toLocaleString('en-US')}</div>;
        },
      },
      {
        header: 'Printer',
        accessorKey: 'printer',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const printerId = cellProps.getValue() as string;
          const printer: Printer = printers.find((p) => p.id === printerId) as Printer;
          return <div>{`${printer.model},${printer.location}` || 'None'}</div>;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='For Students' breadcrumbItem='Print Document(s)' />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <CardTitle className='ml-4'>Pending Request(s)</CardTitle>
                  <TableContainer
                    columns={columns}
                    tableClass='table align-middle table-nowrap'
                    theadClass=''
                    sortBy={sortBy}
                    order={order}
                    onToggleSort={onToggleSort}
                    data={requests}
                    pageSize={requests.length}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PrintDocuments;
