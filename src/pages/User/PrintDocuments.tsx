import React from 'react';
import { Container } from 'reactstrap';

//Import Breadcrumb
import useTitle from 'hooks/useTitle';

import Breadcrumbs from '../../Components/Common/Breadcrumb';

const PrintDocuments = () => {
  useTitle('Print Documents', {
    restoreOnUnmount: true,
  });

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='Print Document(s)' breadcrumbItem='For Students' />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PrintDocuments;
