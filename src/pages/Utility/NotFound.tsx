import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import useTitle from 'hooks/useTitle';
const NotFoundPage = () => {
  useTitle('Không tìm thấy', {
    restoreOnUnmount: true,
  });

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className='account-pages my-5 pt-5'>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='text-center mb-5'>
                <h1 className='display-2 fw-medium'>
                  4<i className='bx bx-buoy bx-spin text-primary display-3' />4
                </h1>
                <h4 className='text-uppercase'>Không tìm thấy trang</h4>
                <div className='mt-5 text-center'>
                  <button
                    className='btn btn-primary waves-effect waves-light'
                    onClick={() => navigate(-1)}
                  >
                    Trở về
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NotFoundPage;
