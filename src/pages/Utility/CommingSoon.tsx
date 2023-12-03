import React from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import useTitle from 'hooks/useTitle';

import maintanence from '../../assets/images/coming-soon.svg';
import logo from '../../assets/images/logo-dark.png';

const ComingsoonPage = () => {
  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>You are good to go!</span>;
    } else {
      return (
        <>
          <div className='coming-box'>
            {days} <span>Days</span>
          </div>{' '}
          <div className='coming-box'>
            {hours} <span>Hours</span>
          </div>{' '}
          <div className='coming-box'>
            {minutes} <span>Minutes</span>
          </div>{' '}
          <div className='coming-box'>
            {seconds} <span>Seconds</span>
          </div>
        </>
      );
    }
  };

  useTitle('Coming Soon', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='home-btn d-none d-sm-block'>
        <Link to='/' className='text-white'>
          <i className='fas fa-home h2' />
        </Link>
      </div>

      <div className='my-5 pt-sm-5'>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='text-center'>
                <Link to='/' className='d-block auth-logo'>
                  <img src={logo} alt='logo' height='20' />
                </Link>
                <Row className='justify-content-center mt-5'>
                  <Col sm='4'>
                    <div className='maintenance-img'>
                      <img src={maintanence} alt='' className='img-fluid mx-auto d-block' />
                    </div>
                  </Col>
                </Row>
                <h4 className='mt-5'>Let&apos;s get started with Skote</h4>
                <p className='text-muted'>
                  It will be as simple as Occidental in fact it will be Occidental.
                </p>

                <Row className='justify-content-center mt-5'>
                  <Col md='8'>
                    <div className='counter-number'>
                      <Countdown date='2023/12/31' renderer={renderer} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ComingsoonPage;
