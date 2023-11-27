import React from 'react';
import { Card, CardBody, CardTitle, Col, Container, Input, Label, Row } from 'reactstrap';

import Breadcrumb from 'Components/Common/Breadcrumb';
import withRouter from 'Components/Common/withRouter';
import useAppSelector from 'hooks/useAppSelector';
import useTitle from 'hooks/useTitle';
import { RootState } from 'slices';

import profileImg from '../../assets/images/profile-img.png';

const UserProfile = () => {
  useTitle('My Profile', {
    restoreOnUnmount: true,
  });

  const { user } = useAppSelector((state: RootState) => state.Login);

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title='General' breadcrumbItem='My Profile' />

          <Card className='overflow-hidden'>
            <div className='bg-primary bg-soft'>
              <Row>
                <Col xs='7'>
                  <div className='text-primary p-3'></div>
                </Col>
                <Col xs='5' className='align-self-end'>
                  <img src={profileImg} alt='' className='img-fluid' />
                </Col>
              </Row>
            </div>
            <CardBody className='pt-0'>
              <Row>
                <Col sm='4'>
                  <div className='avatar-md profile-user-wid mb-4'>
                    <img
                      src={user?.picture}
                      alt=''
                      className='img-thumbnail rounded-circle'
                      style={{
                        aspectRatio: 1,
                      }}
                    />
                  </div>
                  <h5 className='font-size-15 text-truncate'>{user?.name}</h5>
                  <p className='text-muted mb-0 text-truncate'>Student</p>
                </Col>

                <Col sm='8'>
                  <div className='pt-4'>
                    <Row>
                      <Col xs='6'>
                        <h5 className='font-size-15'>20</h5>
                        <p className='text-muted mb-0'>Paper balance</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <CardTitle className='ml-4'>Personal information</CardTitle>
                <form>
                  <Row className='mb-4'>
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Full name
                    </Label>
                    <Col sm={9}>
                      <Input
                        type='text'
                        className='form-control'
                        id='horizontal-firstname-Input'
                        value={user?.name}
                        disabled
                        onChange={() => {}}
                      />
                    </Col>
                  </Row>
                  <Row className='mb-4'>
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Student ID
                    </Label>
                    <Col sm={9}>
                      <Input
                        type='text'
                        className='form-control'
                        id='horizontal-firstname-Input'
                        value={user?.studentId}
                        disabled
                        onChange={() => {}}
                      />
                    </Col>
                  </Row>
                  <Row className='mb-4'>
                    <Label htmlFor='horizontal-firstname-Input' className='col-sm-3 col-form-label'>
                      Faculty
                    </Label>
                    <Col sm={9}>
                      <Input
                        type='text'
                        className='form-control'
                        id='horizontal-firstname-Input'
                        value={user?.faculty}
                        disabled
                        onChange={() => {}}
                      />
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col lg={6}>
            <Card>
              <CardBody>
                <CardTitle tag='h4' className='mb-4'>
                  {' '}
                  Spline Area{' '}
                </CardTitle>
                <Splinearea
                  dataColors='["--bs-primary", "--bs-success"]'
                  series={series}
                  xAxis={xAxis}
                />
                <ReactApexChart
                  options={areaChart}
                  series={printRequestCount}
                  type='area'
                  height='350'
                />
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card>
              <CardBody>
                <CardTitle tag='h4' className='mb-4'>
                  {' '}
                  Column Chart{' '}
                </CardTitle>
                <Apaexlinecolumn dataColors='["--bs-danger","--bs-primary", "--bs-success"]' />
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
