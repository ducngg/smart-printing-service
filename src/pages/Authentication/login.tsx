import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, CardBody, Card, Container } from 'reactstrap';

import withRouter from 'Components/Common/withRouter';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import useTitle from 'hooks/useTitle';
import { RootState } from 'slices';
import { login } from 'slices/auth/login/thunk';

import lightlogo from '../../assets/images/logo-light.png';

const Login = () => {
  useTitle('Đăng nhập', {
    restoreOnUnmount: true,
  });

  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state: RootState) => state.Login);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <React.Fragment>
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='overflow-hidden'>
                <div className='bg-info bg-soft'>
                  <Row>
                    <Col className='col-8 d-flex align-items-center '>
                      <div className='text-primary p-4'>
                        <strong className='h3 text-primary'>Đăng nhập</strong>
                        <p>Ứng dụng quản lí thông tin sinh viên</p>
                      </div>
                    </Col>
                    <Col className='col-4 d-flex flex-md-row flex-column justify-content-center align-items-center pt-4 pb-4'>
                      <img src={lightlogo} alt='' height='50' />
                      <img
                        style={{
                          objectFit: 'cover',
                        }}
                        src={lightlogo}
                        alt=''
                        className='rounded-circle'
                        height='65'
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className='pt-0'>
                  <div className='p-2'>
                    <div className='form-horizontal'>
                      <div className='mt-3 d-grid'>
                        <button
                          type='button'
                          className='btn btn-primary btn-block '
                          onClick={handleLogin}
                        >
                          Đăng nhập bằng Google
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p>© {new Date().getFullYear()} OISP. Phát triển bởi </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
