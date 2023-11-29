import { ColumnDef } from '@tanstack/react-table';
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
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
  UncontrolledTooltip,
} from 'reactstrap';

import TableContainer from 'Components/Common/TableContainer';
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

type Category = {
  id: number;
  name: string;
  description: string;
};

const ExpenseCategory = () => {
  // Modal
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Printer 1',
      description: 'Printer 1',
    },
    {
      id: 2,
      name: 'Printer 2',
      description: 'Printer 2',
    },
    {
      id: 3,
      name: 'Printer 3',
      description: 'Printer 3',
    },
  ]);
  const [editCategory, setEditCategoryModal] = useState<Category | undefined>();
  const [addCategory, setAddCategory] = useState<Partial<Category> | undefined>();

  const toggleEdit = useCallback(() => setEditCategoryModal(undefined), []);
  const toggleAdd = useCallback(() => setAddCategory(undefined), []);

  useTitle('Expense Category', {
    restoreOnUnmount: true,
  });

  const columns = useMemo<ColumnDef<Category, any>[]>(
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
        accessorKey: 'description',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Action',
        accessorKey: 'name',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return (
            <div className='d-flex gap-3'>
              <Link
                to='#'
                className='text-success'
                onClick={() => {
                  setEditCategoryModal(cellProps.row.original);
                }}
              >
                <i className='mdi mdi-pencil font-size-18' id='edittooltip' />
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  {' '}
                  Edit{' '}
                </UncontrolledTooltip>
              </Link>
              <Link
                to='#'
                className='text-danger'
                onClick={() => {
                  setCategories((prev) =>
                    prev.filter((printer) => printer.name !== cellProps.getValue())
                  );
                }}
              >
                <i className='mdi mdi-delete font-size-18' id='deletetooltip' />
                <UncontrolledTooltip placement='top' target='deletetooltip'>
                  {' '}
                  Delete{' '}
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Modal size='lg' isOpen={!!addCategory} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd}>Add</ModalHeader>
        <ModalBody>
          <form>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Category Name
              </Label>
              <Col sm={9}>
                <Input
                  type='text'
                  className='form-control'
                  id='horizontal-firstname-Input'
                  value={addCategory?.name}
                  onChange={(e) =>
                    setAddCategory((prev) => prev && { ...prev, name: e.target.value.toString() })
                  }
                />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Category Description
              </Label>
              <Col sm={9}>
                <Input
                  type='text'
                  className='form-control'
                  id='horizontal-firstname-Input'
                  value={addCategory?.description}
                  onChange={(e) =>
                    setAddCategory(
                      (prev) => prev && { ...prev, description: e.target.value.toString() }
                    )
                  }
                />
              </Col>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type='button'
            className='btn btn-rounded btn-primary'
            onClick={() => {
              if (categories.find((category) => category.name === addCategory?.name)) {
                toast.error('Category name already exists');
                return;
              }
              const newCategory = {
                id: categories.length + 1,
                name: addCategory?.name || '',
                description: addCategory?.description || '',
              };
              setCategories((prev) => (prev ? [...prev, newCategory] : [newCategory]));
              toggleEdit();
            }}
          >
            Edit Printer
          </button>
        </ModalFooter>
      </Modal>
      <Modal size='lg' isOpen={!!editCategory} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Configuration</ModalHeader>
        <ModalBody>
          <form>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Category Name
              </Label>
              <Col sm={9}>
                <Input
                  type='text'
                  className='form-control'
                  id='horizontal-firstname-Input'
                  value={editCategory?.name}
                  onChange={(e) =>
                    setEditCategoryModal(
                      (prev) => prev && { ...prev, name: e.target.value.toString() }
                    )
                  }
                />
              </Col>
            </Row>
            <Row className='mb-4'>
              <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                Category Description
              </Label>
              <Col sm={9}>
                <Input
                  type='text'
                  className='form-control'
                  id='horizontal-firstname-Input'
                  value={editCategory?.description}
                  onChange={(e) =>
                    setEditCategoryModal(
                      (prev) => prev && { ...prev, description: e.target.value.toString() }
                    )
                  }
                />
              </Col>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type='button'
            className='btn btn-rounded btn-primary'
            onClick={() => {
              setCategories((prev) =>
                prev.map((printer) => {
                  if (printer.name === editCategory?.name) {
                    return editCategory;
                  }
                  return printer;
                })
              );
              toggleEdit();
            }}
          >
            Edit Printer
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
                          onClick={() => setAddCategory({})}
                        >
                          Add
                        </button>
                      </Col>
                      <TableContainer
                        columns={columns}
                        tableClass='table align-middle table-nowrap'
                        theadClass=''
                        data={categories}
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

export default ExpenseCategory;
