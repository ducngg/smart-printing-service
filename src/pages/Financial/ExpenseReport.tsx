import { ColumnDef } from '@tanstack/react-table';
import classNames from 'classnames';
import { map } from 'lodash';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import Flatpickr from 'react-flatpickr';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  InputGroup,
  Label,
  Nav,
  NavItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import getChartColorsArray from 'Components/Common/ChartDynamicColor';
import TableContainer from 'Components/Common/TableContainer';
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const ExpenseReport = () => {
  useTitle('Expense Report', {
    restoreOnUnmount: true,
  });

  const [periodType, setPeriodType] = React.useState('weekly');

  const onChangeChartPeriod = (pType: string) => {
    setPeriodType(pType);
  };

  const [page, setPage] = React.useState(1);
  const totalPage = 5;

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        header: 'Category',
        accessorKey: 'category',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Category Description',
        accessorKey: 'description',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Cost (VND)',
        accessorKey: 'cost',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
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
          <Breadcrumbs title='For Financial' breadcrumbItem='Expense Report' />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className='d-sm-flex flex-wrap'>
                    <CardTitle tag='h4' className='mb-4'>
                      Page count of each size
                    </CardTitle>
                    <div className='ms-auto'>
                      <Nav pills>
                        <NavItem>
                          <a
                            className={classNames({ active: periodType === 'weekly' }, 'nav-link')}
                            onClick={() => {
                              onChangeChartPeriod('weekly');
                            }}
                            id='one_month'
                          >
                            Week
                          </a>
                        </NavItem>
                        <NavItem>
                          <a
                            className={classNames({ active: periodType === 'monthly' }, 'nav-link')}
                            onClick={() => {
                              onChangeChartPeriod('monthly');
                            }}
                            id='one_month'
                          >
                            {' '}
                            Month{' '}
                          </a>
                        </NavItem>
                        <NavItem>
                          <a
                            className={classNames({ active: periodType === 'yearly' }, 'nav-link')}
                            onClick={() => {
                              onChangeChartPeriod('yearly');
                            }}
                            id='one_month'
                          >
                            {' '}
                            Year{' '}
                          </a>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                  {/* TODO */}
                  <ReactApexChart
                    options={{
                      chart: {
                        stacked: !0,
                        zoom: {
                          enabled: !0,
                        },
                      },
                      plotOptions: {
                        bar: {
                          horizontal: !1,
                          columnWidth: '15%',
                          // endingShape: "rounded"
                        },
                      },
                      dataLabels: {
                        enabled: !1,
                      },
                      xaxis: {
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
                          'Dec',
                        ],
                        labels: {
                          show: true,
                        },
                      },
                      colors: getChartColorsArray(
                        '["--bs-primary", "--bs-warning", "--bs-success"]'
                      ),
                      legend: {
                        position: 'bottom',
                      },
                      fill: {
                        opacity: 1,
                      },
                    }}
                    series={[
                      {
                        name: 'Category 1',
                        data: [20, 40, 20, 40, 20, 40, 20, 40, 20, 40],
                      },
                      {
                        name: 'Category 2',
                        data: [4, 3, 5, 12, 0, 12, 2, 5, 8, 1],
                      },
                      {
                        name: 'Category 3',
                        data: [1, 2, 4, 1, 7, 6, 2, 8, 8, 1],
                      },
                    ]}
                    type='bar'
                    height='350'
                    className='apex-charts'
                  />
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
                      <CardTitle className='mb-4'>Detailed cost</CardTitle>
                    </Col>
                    <Col>
                      <form className='mb-4'>
                        <Label
                          htmlFor='horizontal-firstname-Input'
                          className='col-sm-3 col-form-label'
                        >
                          Category name
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
                          />
                        </InputGroup>
                      </form>
                    </Col>
                  </Row>

                  <TableContainer
                    columns={columns}
                    tableClass='table align-middle table-nowrap'
                    theadClass=''
                    data={[
                      {
                        category: 'Category 1',
                        description: 'Description 1',
                        cost: '100000',
                      },
                      {
                        category: 'Category 2',
                        description: 'Description 2',
                        cost: '200000',
                      },
                      {
                        category: 'Category 3',
                        description: 'Description 3',
                        cost: '300000',
                      },
                      {
                        category: 'Category 4',
                        description: 'Description 4',
                        cost: '400000',
                      },
                      {
                        category: 'Category 5',
                        description: 'Description 5',
                        cost: '500000',
                      },
                    ]}
                  />
                  <Pagination className='pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1'>
                    <PaginationItem disabled={page === 1}>
                      <PaginationLink previous to='#' onClick={() => setPage(page - 1)} />
                    </PaginationItem>
                    {map(Array(totalPage), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink onClick={() => setPage(i + 1)} to='#'>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPage}>
                      <PaginationLink next to='#' onClick={() => setPage(page + 1)} />
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ExpenseReport;
