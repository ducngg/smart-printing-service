import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

import lightLogo from 'assets/images/logo-light.png';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import useTitle from 'hooks/useTitle';
import { RootState } from 'slices';
import { login } from 'slices/thunk';

import CarouselPage from './CarouselPage';

const Login2 = () => {
  useTitle('Đăng nhập', {
    restoreOnUnmount: true,
  });

  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state: RootState) => state.Login);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) navigate('/print-documents');
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    dispatch(login());
  };
  return (
    <React.Fragment>
      <div>
        <Container fluid className='p-0'>
          <Row className='g-0'>
            <CarouselPage />

            <Col xl={3}>
              <div className='auth-full-page-content p-md-5 p-4'>
                <div className='w-100'>
                  <div className='d-flex flex-column h-100'>
                    <div className='my-auto'>
                      <div className='auth-content'>
                        <img className='auth-logo' width={152} src={lightLogo} alt='logo' />
                        <h2 className='auth-title'>Student Smart Printing Service</h2>
                      </div>

                      <hr className='my-2' />

                      <div className='mt-4'>
                        <h6>Login as</h6>
                        <Button onClick={handleLogin} className='auth-button' outline>
                          Students of HCMUT
                        </Button>
                        <Button onClick={handleLogin} className='auth-button' outline>
                          Students Printing Service Officer (SPSO)
                        </Button>
                        <Button onClick={handleLogin} className='auth-button' outline>
                          HCMUT Planning & Financial Affairs Office
                        </Button>
                        <Button onClick={handleLogin} className='auth-button' outline>
                          HCMUT Technical Support Office
                        </Button>
                      </div>
                    </div>

                    <div className='mt-4 mt-md-5 text-center'>
                      <p className='mb-0'>© {new Date().getFullYear()} HCMUT_SPSS</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login2;
