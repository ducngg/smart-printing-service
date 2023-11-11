import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, BreadcrumbItem } from 'reactstrap';

type BreadcrumbProps = {
  breadcrumbItem?: string;
  title?: string;
  backTo?: string;
};

const Breadcrumb = ({ breadcrumbItem = '', title = '', backTo = '#' }: BreadcrumbProps) => {
  return (
    <Row>
      <Col className='col-12'>
        <div className='page-title-box d-sm-flex align-items-center justify-content-between'>
          <h4 className='mb-sm-0 font-size-18'>{breadcrumbItem}</h4>
          <div className='page-title-right'>
            <ol className='breadcrumb m-0'>
              <BreadcrumbItem>
                <Link to={backTo}>{title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to='#'>{breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
