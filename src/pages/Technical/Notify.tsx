import React from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardTitle, Col, Container, Input, Label, Row } from 'reactstrap';

//Import Breadcrumb
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const Notify = () => {
  useTitle('Notify Maintainence', {
    restoreOnUnmount: true,
  });

  const [msg, setMsg] = React.useState('');
  const [moreInfo, setMoreInfo] = React.useState('');

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='For Technical Support' breadcrumbItem='Notify Maintainence' />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <CardTitle className='ml-4'>Notify users of maintanence/downtime</CardTitle>
                  <form>
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Title
                    </Label>
                    <Input
                      type='text'
                      className='form-control'
                      id='horizontal-firstname-Input'
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Description
                    </Label>
                    <Input
                      type='textarea'
                      rows='7'
                      className='form-control'
                      id='horizontal-firstname-Input'
                      value={moreInfo}
                      onChange={(e) => setMoreInfo(e.target.value)}
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
                disabled={msg === ''}
                onClick={() => {
                  toast.success('Reported successfully');
                  setMsg('');
                  setMoreInfo('');
                }}
              >
                Done
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Notify;
