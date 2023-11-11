import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Col } from 'reactstrap';

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className='auth-full-bg pt-lg-5 p-4'>
          <div className='w-100'>
            <div className='bg-overlay'></div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};
export default CarouselPage;
