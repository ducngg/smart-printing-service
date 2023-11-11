import React from 'react';
import { Container } from 'reactstrap';

import Breadcrumb from 'Components/Common/Breadcrumb';
import useTitle from 'hooks/useTitle';

const Dashboard = () => {
  useTitle('Trang chủ', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumb title='Ứng dụng' breadcrumbItem='Ứng dụng' />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
