import { ColumnDef } from '@tanstack/react-table';
import { map } from 'lodash';
import React, { useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  InputGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import TableContainer from 'Components/Common/TableContainer';
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

type Issue = {
  id: number;
  name: string;
  message: string;
  moreInfo: string;
  createdAt: number;
  priority: 'High' | 'Medium' | 'Low';
  resolved: boolean;
};

const Dropdown = ({
  value,
  onChange,
}: {
  value: Issue['priority'] | undefined;
  onChange: (value: Issue['priority']) => void;
}) => {
  return (
    <select
      className='form-select form-select-sm'
      value={value}
      onChange={(e) => onChange(e.target.value as Issue['priority'])}
    >
      <option selected>All</option>
      <option value='High'>High</option>
      <option value='Medium'>Medium</option>
      <option value='Low'>Low</option>
    </select>
  );
};

const ReportIssue = () => {
  useTitle('Reported Issue', {
    restoreOnUnmount: true,
  });

  const [issues, setIssues] = React.useState<Issue[]>([
    {
      id: 1,
      name: 'User 1',
      message: 'Msg 1',
      moreInfo: 'info 1',
      createdAt: 1701280549392,
      priority: 'High',
      resolved: false,
    },
    {
      id: 2,
      name: 'User 2',
      message: 'Msg 2',
      moreInfo: 'info 2',
      createdAt: 1701280549392,
      priority: 'Low',
      resolved: false,
    },
    {
      id: 3,
      name: 'User 3',
      message: 'Msg 3',
      moreInfo: 'info 3',
      createdAt: 1701280549392,
      priority: 'Medium',
      resolved: false,
    },
    {
      id: 4,
      name: 'User 4',
      message: 'Msg 4',
      moreInfo: 'info 4',
      createdAt: 1701280549392,
      priority: 'Low',
      resolved: true,
    },
    {
      id: 5,
      name: 'User 5',
      message: 'Msg 5',
      moreInfo: 'info 5',
      createdAt: 1701280549392,
      priority: 'Medium',
      resolved: false,
    },
  ]);
  const [page, setPage] = React.useState(1);
  const totalPage = 5;

  const [prio, setPrio] = React.useState<Issue['priority']>();
  const [from, setFrom] = React.useState<number | undefined>();
  const [to, setTo] = React.useState<number | undefined>();
  const [resolved, setResolved] = React.useState<boolean | undefined>();

  const columns = useMemo<ColumnDef<Issue, any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Message',
        accessorKey: 'message',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'More Info',
        accessorKey: 'moreInfo',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Priority',
        accessorKey: 'priority',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return (
            <Dropdown
              value={cellProps.getValue() as Issue['priority']}
              onChange={(value) =>
                setIssues((prev) =>
                  prev.map((item) => {
                    if (item.id === cellProps.row.original.id) {
                      return {
                        ...item,
                        priority: value,
                      };
                    }
                    return item;
                  })
                )
              }
            />
          );
        },
      },
      {
        header: 'Resolved',
        accessorKey: 'resolved',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const b = cellProps.getValue() as boolean;
          return <div>{b ? 'Yes' : 'No'}</div>;
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
          <Breadcrumbs title='For Technical Support' breadcrumbItem='Reported Issue' />

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
                          Priority
                        </Label>
                        <Dropdown value={prio} onChange={setPrio} />
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
                            value={from}
                            onChange={(date) => {
                              setFrom(date[0].getTime());
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
                            value={to}
                            onChange={(date) => {
                              setTo(date[0].getTime());
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
                          Resolved
                        </Label>
                        <select
                          className='form-select form-select-sm'
                          value={resolved === undefined ? undefined : resolved ? 'Yes' : 'No'}
                          onChange={(e) => setResolved(e.target.value === 'Yes' ? true : false)}
                        >
                          <option selected>All</option>
                          <option value='Yes'>Yes</option>
                          <option value='No'>No</option>
                        </select>
                      </form>
                    </Col>
                  </Row>

                  <TableContainer
                    columns={columns}
                    tableClass='table align-middle table-nowrap'
                    theadClass=''
                    data={issues}
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

export default ReportIssue;
