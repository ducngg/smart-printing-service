import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import TableContainer from 'Components/Common/TableContainer';
import { printRequests, printers } from 'data';
import useTitle from 'hooks/useTitle';
import { Document, PrintRequest, Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

import 'flatpickr/dist/themes/material_blue.css';

const PrintHistory = () => {
  useTitle('Print History', {
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
      {
        header: 'Status',
        accessorKey: 'status',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const status = cellProps.getValue() as string;

          switch (status) {
            case 'Printing':
              return <Badge className='badge-soft-primary'>Printing</Badge>;
            case 'Success':
              return <Badge className='badge-soft-success'>Success</Badge>;
            case 'Failed':
              return <Badge className='badge-soft-danger'>Failed</Badge>;
            default:
              return <Badge className='badge-soft-warning'>Pending</Badge>;
          }
        },
      },
    ],
    []
  );

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='For Students' breadcrumbItem='Print History' />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className='mb-4'>Print History</CardTitle>
                    </Col>
                    <Col>
                      <form className='mb-4'>
                        <Label
                          htmlFor='horizontal-firstname-Input'
                          className='col-sm-3 col-form-label'
                        >
                          From
                        </Label>
                        <InputGroup>
                          <Flatpickr
                            className='form-control d-block'
                            placeholder='dd mm yy'
                            options={{
                              altInput: true,
                              dateFormat: 'd-m-Y',
                            }}
                            value={startDate || undefined}
                            onChange={(date) => setStartDate(date[0])}
                          />
                        </InputGroup>
                      </form>
                    </Col>
                    <Col>
                      <form className='mb-4'>
                        <Label
                          htmlFor='horizontal-firstname-Input'
                          className='col-sm-3 col-form-label'
                        >
                          To
                        </Label>
                        <InputGroup>
                          <Flatpickr
                            className='form-control d-block'
                            placeholder='dd mm yy'
                            options={{
                              altInput: true,
                              dateFormat: 'd-m-Y',
                            }}
                            value={endDate || undefined}
                            onChange={(date) => setEndDate(date[0])}
                          />
                        </InputGroup>
                      </form>
                    </Col>
                  </Row>

                  <TableContainer
                    columns={columns}
                    tableClass='table align-middle table-nowrap'
                    theadClass=''
                    data={printRequests.filter((request) => {
                      if (startDate) {
                        if (!endDate) return request.createdAt >= startDate.getTime();
                        return (
                          request.createdAt >= startDate.getTime() &&
                          request.createdAt <= endDate.getTime()
                        );
                      } else if (endDate) {
                        return request.createdAt <= endDate.getTime();
                      }
                      return true;
                    })}
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

export default PrintHistory;
