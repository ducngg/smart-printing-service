import { ColumnDef } from '@tanstack/react-table';
import { map } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap';

import TableContainer from 'Components/Common/TableContainer';
import { printers as defaultPrinters } from 'data';
import useTitle from 'hooks/useTitle';
import { Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const PrinterStatus = () => {
  // Modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [printers] = useState<Printer[]>(defaultPrinters);
  const [page, setPage] = useState<number>(1);
  const [totalPage] = useState<number>(Math.ceil(printers.length / 10));

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useTitle('Print Documents', {
    restoreOnUnmount: true,
  });

  const printerColumns = useMemo<ColumnDef<Printer, any>[]>(
    () => [
      {
        header: 'Printer ID',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return (
            <div>
              <b>{cellProps.getValue()}</b>
            </div>
          );
        },
      },
      {
        header: 'Brand name',
        accessorKey: 'brand',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Model name',
        accessorKey: 'model',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Location',
        accessorKey: 'location',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const status = cellProps.getValue() as Printer['status'];

          switch (status) {
            case 'Disabled':
              return <Badge className='badge-soft-danger'>Disabled</Badge>;
            default:
              return <Badge className='badge-soft-success'>Enabled</Badge>;
          }
        },
      },
      {
        header: 'Last checked at',
        accessorKey: 'lastUsed',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          const date = new Date(cellProps.getValue() as number);
          return <div>{date.toLocaleString('en-US')}</div>;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Modal size='lg' isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Configuration</ModalHeader>
        <ModalBody>
          <form>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Brand name
              </Label>
              <Col sm={9}>
                <Input type='text' className='form-control' id='horizontal-firstname-Input' />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Model Name
              </Label>
              <Col sm={9}>
                <Input type='text' className='form-control' id='horizontal-firstname-Input' />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Campus
              </Label>
              <Col sm={9}>
                <Input type='text' className='form-control' id='horizontal-firstname-Input' />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Building
              </Label>
              <Col sm={9}>
                <Input type='text' className='form-control' id='horizontal-firstname-Input' />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Room
              </Label>
              <Col sm={9}>
                <Input type='text' className='form-control' id='horizontal-firstname-Input' />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Col sm={12}>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Description
                </Label>
                <Input
                  type='textarea'
                  row='10'
                  className='form-control'
                  id='horizontal-firstname-Input'
                />
              </Col>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type='button'
            className='btn btn-rounded btn-primary'
            onClick={() => setIsOpen(false)}
          >
            Add Printer
          </button>
        </ModalFooter>
      </Modal>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='For Technical Support' breadcrumbItem='Printer Status' />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Col className='d-flex justify-content-between'>
                        <CardTitle className='ml-4'>Printer list</CardTitle>
                      </Col>
                      <TableContainer
                        columns={printerColumns}
                        tableClass='table align-middle table-nowrap'
                        theadClass=''
                        data={printers}
                      />
                    </Col>
                  </Row>
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

export default PrinterStatus;
