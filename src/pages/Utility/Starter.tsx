import React from 'react';
import { Container } from 'reactstrap';

//Import Breadcrumb
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const StarterPage = () => {
  useTitle('Starter Page', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='Utility' breadcrumbItem='Starter Page' />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StarterPage;
