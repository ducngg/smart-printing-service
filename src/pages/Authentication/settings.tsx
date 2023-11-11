import React from 'react';
import { Container } from 'reactstrap';

import Breadcrumb from 'Components/Common/Breadcrumb';
import useTitle from 'hooks/useTitle';

const Setting = () => {
  useTitle('Cài đặt', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb title='Tài khoản' breadcrumbItem='Cài đặt' />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Setting;
