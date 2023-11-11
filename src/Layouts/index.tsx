import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <div id='layout-wrapper'>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
