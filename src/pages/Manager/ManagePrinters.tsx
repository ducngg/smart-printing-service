import { ColumnDef } from '@tanstack/react-table';
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
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
  Row,
} from 'reactstrap';

import TableContainer from 'Components/Common/TableContainer';
import { printers as defaultPrinters } from 'data';
import useTitle from 'hooks/useTitle';
import { Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const ManagerPrinters = () => {
  // Modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [printers, setPrinters] = useState<Printer[]>(defaultPrinters);

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
        header: 'Action',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return (
            <Button
              type='button'
              color='primary'
              className='btn-sm btn-rounded'
              style={{
                width: 100,
              }}
              onClick={() =>
                setPrinters((pl) =>
                  pl.map((p, index) => {
                    if (index === cellProps.cell.row.index) {
                      return {
                        ...p,
                        status: p.status === 'Disabled' ? 'Enabled' : 'Disabled',
                      };
                    }
                    return p;
                  })
                )
              }
            >
              {printers[cellProps.cell.row.index].status === 'Disabled' ? 'Enabled' : 'Disabled'}
            </Button>
          );
        },
      },
      {
        header: 'Action',
        accessorKey: 'id',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return (
            <Link
              to='#'
              className='text-danger'
              onClick={() =>
                setPrinters((prev) => prev.filter((x) => x.id !== cellProps.getValue()))
              }
            >
              <i className='mdi mdi-delete font-size-18'></i>
            </Link>
          );
        },
      },
    ],
    [printers]
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
          <Breadcrumbs title='For SPSO' breadcrumbItem='manage printers(s)' />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Col className='d-flex justify-content-between'>
                        <CardTitle className='ml-4'>Printer list</CardTitle>
                        <button
                          type='button'
                          className='btn btn-rounded btn-success'
                          onClick={() => setIsOpen(true)}
                        >
                          Add
                        </button>
                      </Col>
                      <TableContainer
                        columns={printerColumns}
                        tableClass='table align-middle table-nowrap'
                        theadClass=''
                        data={printers}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManagerPrinters;
