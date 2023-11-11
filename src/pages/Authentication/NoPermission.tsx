import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import useTitle from 'hooks/useTitle';

const NoPermission = () => {
  useTitle('Không có quyền truy cập', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className='p-2'>
                    <div className='text-center'>
                      <div className='avatar-md mx-auto'>
                        <div className='avatar-title rounded-circle bg-light'>
                          <i className='bx bxs-lock h1 mb-0 text-danger'></i>
                        </div>
                      </div>
                      <div className='p-2 mt-4'>
                        <h4>Không có quyền truy cập</h4>
                        <p>Bạn cần được cấp quyền để truy cập và hệ thống.</p>
                        <div className='mt-4'>
                          <Link to='/login' className='btn btn-danger w-md'>
                            Trở lại
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p>© {new Date().getFullYear()} OISP. Thiết kế bởi </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default NoPermission;
