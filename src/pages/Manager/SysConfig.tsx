import React from 'react';
import Flatpickr from 'react-flatpickr';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

import 'flatpickr/dist/themes/material_blue.css';

const SysConfig = () => {
  useTitle('System Configuration', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='For SPSO' breadcrumbItem='System Configuration' />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <CardTitle className='ml-4'>Configure print properties</CardTitle>
                  <form>
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Default number of pages
                    </Label>
                    <Input type='number' className='form-control' id='horizontal-firstname-Input' />
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Date for default pages
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
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Permitted file extensions (separated by a comma)
                    </Label>
                    <Input type='text' className='form-control' id='horizontal-firstname-Input' />
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              xs={12}
            >
              <Button
                type='button'
                color='success'
                className='btn-sm btn-rounded'
                style={{
                  width: 100,
                }}
                onClick={() => {
                  toast.info('Saved!');
                }}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SysConfig;
