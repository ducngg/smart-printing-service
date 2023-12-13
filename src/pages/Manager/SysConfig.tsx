import React, { useState } from 'react';
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

// eslint-disable-next-line import/no-extraneous-dependencies
import 'flatpickr/dist/themes/material_blue.css';
// eslint-disable-next-line import/order
import { useLocalStorage } from 'usehooks-ts';
// eslint-disable-next-line import/order
import _ from 'lodash';

const SysConfig = () => {
  useTitle('System Configuration', {
    restoreOnUnmount: true,
  });

  const [types, setTypes] = useLocalStorage('types', [
    '.doc',
    '.docx',
    '.rtf',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.pdf',
    '.txt',
  ]);

  const [configFileTypes, setConfigFileTypes] = useState(_.join(types, ', '));

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
                    <Input
                      type='text'
                      value={configFileTypes}
                      className='form-control'
                      id='horizontal-firstname-Input'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfigFileTypes(e.target.value)
                      }
                    />
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
                  const extensions = _.split(configFileTypes, ',');
                  const ok = _.every(extensions, (ext) => {
                    const trimmedExtension = _.trim(ext);
                    let alphaNumeric = true;
                    for (let i = 1; i < trimmedExtension.length; i++) {
                      if (
                        !(
                          (trimmedExtension[i] >= 'a' && trimmedExtension[i] <= 'z') ||
                          (trimmedExtension[i] >= 'A' && trimmedExtension[i] <= 'Z') ||
                          (trimmedExtension[i] >= '0' && trimmedExtension[i] <= '9')
                        )
                      ) {
                        alphaNumeric = false;
                      }
                    }

                    if (
                      _.startsWith(trimmedExtension, '.') &&
                      trimmedExtension.length >= 2 &&
                      alphaNumeric
                    ) {
                      return true;
                    }

                    return false;
                  });

                  if (!ok) {
                    toast.error(
                      'Expected file types separated by comma. For example: .doc, .pdf, .xlxs'
                    );
                    return;
                  }

                  const newTypes = _.map(_.split(configFileTypes, ','), s => _.trim(s))
                  setTypes(newTypes);
                  setConfigFileTypes(_.join(newTypes, ', '));

                  toast.success('System configuration saved');
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
