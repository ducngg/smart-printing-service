import React from 'react';

import withRouter from '../Components/Common/withRouter';

type NonAuthLayoutProps = {
  children: React.ReactNode;
};

const NonAuthLayout = ({ children }: NonAuthLayoutProps) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(NonAuthLayout);
