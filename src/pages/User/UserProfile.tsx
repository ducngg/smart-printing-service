/* eslint-disable jsx-a11y/anchor-is-valid */
import { ApexOptions } from 'apexcharts';
import classNames from 'classnames';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  Row,
} from 'reactstrap';

import Breadcrumb from 'Components/Common/Breadcrumb';
import getChartColorsArray from 'Components/Common/ChartDynamicColor';
import withRouter from 'Components/Common/withRouter';
import useAppSelector from 'hooks/useAppSelector';
import useTitle from 'hooks/useTitle';
import { RootState } from 'slices';

import profileImg from '../../assets/images/profile-img.png';

const options: ApexOptions = {
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: getChartColorsArray('["--bs-primary", "--bs-warning"]'),
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'December',
    ],
  },
  grid: {
    borderColor: '#f1f1f1',
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
};

const chartOptions: ApexOptions = {
  chart: {
    stacked: !0,
    zoom: {
      enabled: !0,
    },
  },
  plotOptions: {
    bar: {
      horizontal: !1,
      columnWidth: '15%',
      // endingShape: "rounded"
    },
  },
  dataLabels: {
    enabled: !1,
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    labels: {
      show: true,
    },
  },
  colors: getChartColorsArray('["--bs-primary", "--bs-warning"]'),
  legend: {
    position: 'bottom',
  },
  fill: {
    opacity: 1,
  },
};

const UserProfile = () => {
  useTitle('My Profile', {
    restoreOnUnmount: true,
  });

  const { user } = useAppSelector((state: RootState) => state.Login);

  const [periodType, setPeriodType] = React.useState('weekly');

  const onChangeChartPeriod = (pType: string) => {
    setPeriodType(pType);
  };

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

        <Row>
          <Col lg={7}>
            <Card>
              <CardBody>
                <div className='d-flex flex-wrap'>
                  <h5 className='card-title me-2'> My print request count </h5>
                  <div className='ms-auto'>
                    <div className='toolbar d-flex flex-wrap gap-2 text-end'>
                      <button type='button' className='btn btn-light btn-sm'>
                        Today
                      </button>
                      <button type='button' className='btn btn-light btn-sm'>
                        1M
                      </button>
                      <button type='button' className='btn btn-light btn-sm'>
                        6M
                      </button>
                      <button type='button' className='btn btn-light btn-sm active'>
                        1Y
                      </button>
                    </div>
                  </div>
                </div>

                <Row className='text-center'>
                  <Col lg={4}>
                    <div className='mt-4'>
                      <p className='text-muted mb-1'>Today</p>
                      <h5>1024</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className='mt-4'>
                      <p className='text-muted mb-1'>This Month</p>
                      <h5>12356</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className='mt-4'>
                      <p className='text-muted mb-1'>This Year</p>
                      <h5>102354</h5>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <ReactApexChart
                    options={options}
                    series={[
                      {
                        name: 'Print request',
                        data: [20, 23, 45, 33, 25, 43, 35, 44, 30, 40],
                      },
                    ]}
                    type='area'
                    height='350'
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={5}>
            <Card>
              <CardBody>
                <div className='d-sm-flex flex-wrap'>
                  <CardTitle tag='h4' className='mb-4'>
                    Page count of each size
                  </CardTitle>
                  <div className='ms-auto'>
                    <Nav pills>
                      <NavItem>
                        <a
                          className={classNames({ active: periodType === 'weekly' }, 'nav-link')}
                          onClick={() => {
                            onChangeChartPeriod('weekly');
                          }}
                          id='one_month'
                        >
                          Week
                        </a>
                      </NavItem>
                      <NavItem>
                        <a
                          className={classNames({ active: periodType === 'monthly' }, 'nav-link')}
                          onClick={() => {
                            onChangeChartPeriod('monthly');
                          }}
                          id='one_month'
                        >
                          {' '}
                          Month{' '}
                        </a>
                      </NavItem>
                      <NavItem>
                        <a
                          className={classNames({ active: periodType === 'yearly' }, 'nav-link')}
                          onClick={() => {
                            onChangeChartPeriod('yearly');
                          }}
                          id='one_month'
                        >
                          {' '}
                          Year{' '}
                        </a>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
                {/* TODO */}
                <ReactApexChart
                  options={chartOptions}
                  series={[
                    {
                      name: 'A4',
                      data: [20, 40, 20, 40, 20, 40, 20, 40, 20, 40],
                    },
                    {
                      name: 'A3',
                      data: [4, 3, 5, 12, 0, 12, 2, 5, 8, 1],
                    },
                  ]}
                  type='bar'
                  height='350'
                  className='apex-charts'
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
