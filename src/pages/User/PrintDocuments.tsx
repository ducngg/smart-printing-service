import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import TableContainer from 'Components/Common/TableContainer';
import { printRequests, printers } from 'data';
import useTitle from 'hooks/useTitle';
import { Document, PrintRequest, Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const defaultRequest: PrintRequest = {
  id: Date.now().toString(),
  files: [],
  fileCount: 0,
  pageCount: 0,
  createdAt: 0,
  printer: '',
};

const PrintDocuments = () => {
  const [newRequest, setNewRequest] = useState<PrintRequest>(defaultRequest);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [requests] = useState<PrintRequest[]>(printRequests);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

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

  const handleConfirm = () => {};
  const handleAddFile = () => {};

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
      <Modal size='lg' isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new file</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <button type='button' className='btn btn-rounded btn-primary' onClick={handleAddFile}>
            Add File
          </button>
        </ModalFooter>
      </Modal>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='For Students' breadcrumbItem='Print Document(s)' />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs={12} sm={6}>
                      <CardTitle className='ml-4'>Make a print request</CardTitle>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                      xs={12}
                      sm={6}
                    >
                      <Button
                        type='button'
                        color='success'
                        className='btn-sm btn-rounded'
                        onClick={toggle}
                      >
                        + Add new file
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={8}>
                      {' '}
                      <Row style={{ gap: 4 }}>
                        <Col xs={12}>
                          <Button
                            type='button'
                            color='primary'
                            className='btn-sm btn-rounded'
                            style={{
                              marginRight: 12,
                              paddingTop: 2,
                              paddingBottom: 2,
                            }}
                            onClick={() => {}}
                          >
                            Select all
                          </Button>
                        </Col>
                        <Col xs={12}>
                          <Button
                            type='button'
                            color='primary'
                            className='btn-sm btn-rounded'
                            style={{
                              marginRight: 12,
                              paddingTop: 2,
                              paddingBottom: 2,
                            }}
                            onClick={() => {}}
                          >
                            Delete section
                          </Button>
                        </Col>
                        <Col xs={12}>
                          <b
                            className='font-weight-bold'
                            style={{
                              marginRight: 12,
                            }}
                          >
                            Total page(s) to print:{' '}
                            <span>
                              {newRequest.files.reduce((acc, val) => {
                                return acc + val.printPage;
                              }, 0)}
                            </span>
                          </b>
                        </Col>
                        <Col xs={12}>
                          <b
                            className='font-weight-bold'
                            style={{
                              marginRight: 12,
                            }}
                          >
                            Page balance:{' '}
                            <span>
                              {newRequest.files.reduce((acc, val) => {
                                return acc + val.printPage;
                              }, 0)}
                            </span>
                          </b>
                        </Col>
                        <Col xs={12}>
                          <b
                            className='font-weight-bold'
                            style={{
                              marginRight: 12,
                            }}
                          >
                            Printer:{'  '}
                            <select
                              className='form-select'
                              name='state'
                              style={{
                                display: 'inline-block',
                                marginLeft: 4,
                                width: 150,
                              }}
                              value={newRequest.printer}
                              onChange={(e) => {
                                setNewRequest((prev) => ({
                                  ...prev,
                                  printer: e.target.value,
                                }));
                              }}
                            >
                              {printers.map((printer) => (
                                <option key={printer.id} value={printer.id}>
                                  {printer.model}
                                </option>
                              ))}
                            </select>
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}
                      xs={12}
                      sm={4}
                    >
                      <Button
                        type='button'
                        color='primary'
                        className='btn-sm btn-rounded'
                        style={{
                          width: 100,
                        }}
                        onClick={handleConfirm}
                      >
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
