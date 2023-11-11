import { ColumnDef } from '@tanstack/react-table';
import React, { useCallback, useMemo, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
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

//Import Breadcrumb
import TableContainer from 'Components/Common/TableContainer';
import { printRequests, printers } from 'data';
import formatBytes from 'helpers/format-bytes';
import useTitle from 'hooks/useTitle';
import { Document, PaperSize, PrintRequest, Printer } from 'types';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const defaultRequest: PrintRequest = {
  id: Date.now().toString(),
  files: [],
  fileCount: 0,
  pageCount: 0,
  createdAt: 0,
  printer: printers[0].id,
};

const defaultDocument: Document = {
  id: '',
  name: '',
  mimeType: '',
  printPageCount: 0,
  printPages: '',
  pagePerSheet: 0,
  paperSize: PaperSize.A4,
  copies: 0,
  side: 'OneSided',
  orientation: 'Portrait',
  uploadStatus: 0,
};

type PreviewFile = File & {
  formattedSize: string;
};

const PrintDocuments = () => {
  // Modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [document, setDocument] = useState<Document>(defaultDocument);
  const [uploadedFile, setUploadedFile] = useState<PreviewFile | null>(null);

  // New Request
  const [newRequest, setNewRequest] = useState<PrintRequest>(defaultRequest);

  // Other
  const [requests, setRequests] = useState<PrintRequest[]>(printRequests);
  const [sortBy, setSortBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

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

  const handleConfirm = useCallback(() => {
    if (newRequest.files.length <= 0) {
      toast.error('Please add a file to print');
      return;
    }
    if (newRequest.printer === '') {
      toast.error('Please select a printer');
      return;
    }
    toast.success('Request sent');
    setNewRequest(defaultRequest);
    setRequests((prev) => [...prev, newRequest]);
  }, [newRequest]);

  const handleAddFile = useCallback(() => {
    if (!uploadedFile) return;
    setNewRequest((prev) => ({
      ...prev,
      files: [
        ...prev.files,
        {
          ...document,
          id: Date.now().toString(),
          name: uploadedFile.name,
          mimeType: uploadedFile.type,
          uploadStatus: 0,
        },
      ],
      fileCount: prev.fileCount + 1,
      pageCount: prev.pageCount + document.printPageCount,
    }));
    setUploadedFile(null);
    setDocument(defaultDocument);
    toggle();
  }, [document, uploadedFile, toggle]);

  const newRequestColumns = useMemo<ColumnDef<Document, any>[]>(
    () => [
      {
        header: 'File name',
        accessorKey: 'name',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'File type',
        accessorKey: 'mimeType',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Page(s) to print',
        accessorKey: 'printPageCount',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Pages per sheet',
        accessorKey: 'pagePerSheet',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Paper size',
        accessorKey: 'paperSize',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Copies',
        accessorKey: 'copies',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'One/Double-sided',
        accessorKey: 'side',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Orientation',
        accessorKey: 'orientation',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
      {
        header: 'Upload status',
        accessorKey: 'uploadStatus',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: (cellProps) => {
          return <div>{cellProps.getValue()}</div>;
        },
      },
    ],
    []
  );

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

  const handleAcceptedFiles = (files: File[]) => {
    if (files.length <= 0) return;
    if (files[0].type !== 'application/pdf') {
      toast.error('Only pdf files are allowed');
      return;
    }
    setUploadedFile(
      Object.assign(files[0], {
        formattedSize: formatBytes(files[0].size),
      })
    );
  };

  console.log(requests.length);

  return (
    <React.Fragment>
      <Modal size='lg' isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new file</ModalHeader>
        <ModalBody>
          <form>
            <p className='h3 card-title'> File</p>
            <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div className='dropzone'>
                  <div className='dz-message needsclick mt-2' {...getRootProps()}>
                    <input {...getInputProps?.()} />
                    <div className='mb-3'>
                      <i className='display-4 text-muted bx bxs-cloud-upload' />
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className='dropzone-previews mt-3' id='file-previews'>
              {uploadedFile && (
                <Card className='mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete'>
                  <div className='p-2'>
                    <Row className='align-items-center'>
                      <Col className='col-auto'>
                        <i className='mdi mdi-file-document font-size-16 align-middle text-primary me-2"'></i>{' '}
                      </Col>
                      <Col>
                        <Link to='#' className='text-muted font-weight-bold'>
                          {uploadedFile.name}
                        </Link>
                        <p className='mb-0'>
                          <strong>{uploadedFile.formattedSize}</strong>
                        </p>
                      </Col>
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        <Link
                          to='#'
                          className='text-danger'
                          onClick={() => {
                            setUploadedFile(null);
                          }}
                        >
                          <i className='mdi mdi-delete font-size-18'></i>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </Card>
              )}
            </div>

            <p style={{ marginTop: 24 }} className='h3 card-title'>
              Configuration
            </p>

            <form>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Pages to Print
                </Label>
                <Col sm={9}>
                  <Input
                    type='number'
                    className='form-control'
                    id='horizontal-firstname-Input'
                    value={document.printPageCount}
                    onChange={(e) =>
                      setDocument({ ...document, printPageCount: e.target.valueAsNumber })
                    }
                  />
                </Col>
              </Row>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Enter pages to print (separated by a comma):
                </Label>
                <Col sm={9}>
                  <Input
                    type='text'
                    className='form-control'
                    id='horizontal-firstname-Input'
                    value={document.printPages}
                    onChange={(e) => setDocument({ ...document, printPages: e.target.value })}
                  />
                </Col>
              </Row>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Paper size
                </Label>
                <Col sm={9}>
                  <select
                    className='form-select'
                    style={{
                      display: 'inline-block',
                      marginLeft: 4,
                      width: 150,
                    }}
                    value={document.paperSize}
                    onChange={(e) =>
                      setDocument({
                        ...document,
                        paperSize: PaperSize[e.target.value] as PaperSize,
                      })
                    }
                  >
                    {Object.keys(PaperSize)
                      .filter((p) => typeof p === 'string')
                      .map((p: string) => (
                        <option key={p} value={p}>
                          {PaperSize[p]}
                        </option>
                      ))}
                  </select>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Copies
                </Label>
                <Col sm={9}>
                  <Input
                    type='number'
                    className='form-control'
                    id='horizontal-firstname-Input'
                    value={document.copies}
                    onChange={(e) => setDocument({ ...document, copies: e.target.valueAsNumber })}
                    onBlur={() => {}}
                  />
                </Col>
              </Row>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Paper size
                </Label>
                <Col sm={9}>
                  <select
                    className='form-select'
                    style={{
                      display: 'inline-block',
                      marginLeft: 4,
                      width: 150,
                    }}
                    value={document.side}
                    onChange={(e) =>
                      setDocument({ ...document, side: e.target.value as 'OneSided' | 'TwoSided' })
                    }
                  >
                    <option value='OneSided'>OneSided</option>
                    <option value='TwoSided'>TwoSided</option>
                  </select>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Orientation
                </Label>
                <Col sm={9}>
                  <select
                    className='form-select'
                    style={{
                      display: 'inline-block',
                      marginLeft: 4,
                      width: 150,
                    }}
                    value={document.orientation}
                    onChange={(e) =>
                      setDocument({
                        ...document,
                        orientation: e.target.value as 'Portrait' | 'Landscape',
                      })
                    }
                  >
                    <option value='Portrait'>Portrait</option>
                    <option value='Landscape'>Landscape</option>
                  </select>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                  Pages per sheet
                </Label>
                <Col sm={9}>
                  <Input
                    type='number'
                    className='form-control'
                    id='horizontal-firstname-Input'
                    value={document.pagePerSheet}
                    onChange={(e) =>
                      setDocument({ ...document, pagePerSheet: e.target.valueAsNumber })
                    }
                  />
                </Col>
              </Row>
            </form>
          </form>
        </ModalBody>
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

                  <TableContainer
                    columns={newRequestColumns}
                    tableClass='table align-middle table-nowrap'
                    theadClass=''
                    data={newRequest.files}
                  />

                  <Row>
                    <Col xs={12} sm={8} style={{ marginBottom: 8 }}>
                      {' '}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 4,
                        }}
                      >
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
                          <b
                            className='font-weight-bold'
                            style={{
                              marginRight: 12,
                            }}
                          >
                            Total page(s) to print:{' '}
                            <span>
                              {newRequest.files.reduce((acc, val) => {
                                return acc + val.printPageCount;
                              }, 0)}
                            </span>
                          </b>
                        </div>
                        <div>
                          <b
                            className='font-weight-bold'
                            style={{
                              marginRight: 12,
                            }}
                          >
                            Page balance:{' '}
                            <span>
                              {newRequest.files.reduce((acc, val) => {
                                return acc + val.printPageCount;
                              }, 0)}
                            </span>
                          </b>
                        </div>
                        <div>
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
                              content={newRequest.printer || 'None'}
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
                        </div>
                      </div>
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
