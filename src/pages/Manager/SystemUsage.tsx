import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
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
import getChartColorsArray from 'Components/Common/ChartDynamicColor';
import TableContainer from 'Components/Common/TableContainer';
import { printRequests, printers } from 'data';
import useTitle from 'hooks/useTitle';
import { Document, PrintRequest, Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const SystemUsage = () => {
  useTitle('Starter Page', {
    restoreOnUnmount: true,
  });

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

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
          const status = cellProps.getValue() as PrintRequest['status'];

          switch (status) {
            case 'Printing':
              return <Badge className='badge-soft-primary'>Printing</Badge>;
            case 'Sucesss':
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

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='For SPSO' breadcrumbItem='System Usage' />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className='d-flex flex-wrap'>
                    <h5 className='card-title me-2'>System usage - Print requests count</h5>
                    <div className='ms-auto'>
                      <div className='toolbar d-flex flex-wrap gap-2 text-end'>
                        <button type='button' className='btn btn-light btn-sm'>
                          Today
                        </button>
                        <button type='button' className='btn btn-light btn-sm'>
                          1M
                        </button>
                        <button type='button' className='btn btn-light btn-sm'>
                          6M
                        </button>
                        <button type='button' className='btn btn-light btn-sm active'>
                          1Y
                        </button>
                      </div>
                    </div>
                  </div>

                  <Row className='text-center'>
                    <Col lg={4}>
                      <div className='mt-4'>
                        <p className='text-muted mb-1'>Today</p>
                        <h5>1024</h5>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className='mt-4'>
                        <p className='text-muted mb-1'>This Month</p>
                        <h5>12356</h5>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className='mt-4'>
                        <p className='text-muted mb-1'>This Year</p>
                        <h5>102354</h5>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <ReactApexChart
                      options={{
                        dataLabels: {
                          enabled: false,
                        },
                        stroke: {
                          curve: 'smooth',
                          width: 3,
                        },
                        colors: getChartColorsArray('["--bs-primary", "--bs-warning"]'),
                        xaxis: {
                          type: 'category',
                          categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'December',
                          ],
                        },
                        grid: {
                          borderColor: '#f1f1f1',
                        },
                        tooltip: {
                          x: {
                            format: 'dd/MM/yy HH:mm',
                          },
                        },
                      }}
                      series={[
                        {
                          name: 'Print request',
                          data: [20, 23, 45, 33, 25, 43, 35, 44, 30, 40],
                        },
                      ]}
                      type='area'
                      height='350'
                    />
                  </Row>
                  <h5 className='card-title me-2'>System usage reports</h5>
                  <Row
                    className='d-flex flex-row justify-content-between align-items-center px-3'
                    style={{
                      minHeight: 52,
                      borderTop: '1px solid #ebebeb',
                    }}
                  >
                    {' '}
                    <h6 style={{ width: 'auto' }}>System usage report for 2023</h6>
                    <i style={{ width: 'auto' }} className='bx bxs-download'></i>
                  </Row>
                  <Row
                    className='d-flex flex-row justify-content-between align-items-center px-3'
                    style={{
                      minHeight: 52,
                      borderTop: '1px solid #ebebeb',
                    }}
                  >
                    {' '}
                    <h6 style={{ width: 'auto' }}>System usage report for December - 2023</h6>
                    <i style={{ width: 'auto' }} className='bx bxs-download'></i>
                  </Row>
                  <Row
                    className='d-flex flex-row justify-content-between align-items-center px-3'
                    style={{
                      minHeight: 52,
                      borderTop: '1px solid #ebebeb',
                    }}
                  >
                    {' '}
                    <h6 style={{ width: 'auto' }}>System usage report for November - 2023</h6>
                    <i style={{ width: 'auto' }} className='bx bxs-download'></i>
                  </Row>
                  <Row
                    className='d-flex flex-row justify-content-between align-items-center px-3'
                    style={{
                      minHeight: 52,
                      borderTop: '1px solid #ebebeb',
                    }}
                  >
                    {' '}
                    <h6 style={{ width: 'auto' }}>System usage report for November - 2023</h6>
                    <i style={{ width: 'auto' }} className='bx bxs-download'></i>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className='mb-4'>Print Request History</CardTitle>
                    </Col>
                    <Col>
                      <form className='mb-4'>
                        <Label
                          htmlFor='horizontal-firstname-Input'
                          className='col-sm-3 col-form-label'
                        >
                          Student name:
                        </Label>
                        <input
                          type='text'
                          className='form-control'
                          id='horizontal-firstname-Input'
                          placeholder='Search'
                        />
                      </form>
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

export default SystemUsage;
