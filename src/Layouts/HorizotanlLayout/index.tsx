import React, { useState, useEffect } from 'react';

import RightSidebar from 'Components/CommonForBoth/RightSidebar';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RootState } from 'slices';
import { changeLayout, changeLayoutMode, changeTopbarTheme } from 'slices/layouts/thunk';

import withRouter from '../../Components/Common/withRouter';

import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

type HorizontalLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  const dispatch = useAppDispatch();
  const { layoutTypes, layoutModeTypes, topbarThemeTypes } = useAppSelector((state: RootState) => ({
    layoutTypes: state.Layout.layoutTypes,
    layoutModeTypes: state.Layout.layoutModeTypes,
    layoutWidthTypes: state.Layout.layoutWidthTypes,
    topbarThemeTypes: state.Layout.topbarThemeTypes,
  }));

  useEffect(() => {
    if (layoutTypes || layoutModeTypes || topbarThemeTypes) {
      dispatch(changeLayout(layoutTypes));
      dispatch(changeLayoutMode(layoutModeTypes));
      dispatch(changeTopbarTheme(topbarThemeTypes));
    }
  }, [layoutTypes, layoutModeTypes, topbarThemeTypes, dispatch]);

  const [open, setOpen] = useState<boolean>(false);
  const [openColl, setOpenColl] = useState<boolean>(false);

  const toggleCanvas = () => setOpen(!open);

  const toggleLeftmenu = () => setOpenColl(!openColl);

  return (
    <React.Fragment>
      <div id='layout-wrapper'>
        <Header toggleCanvas={toggleCanvas} toggleLeftmenu={toggleLeftmenu} />
        <Navbar leftMenu={openColl} />
        <div className='main-content'>
          {children}
          <Footer />
          <RightSidebar show={open} toggleCanvas={toggleCanvas} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(HorizontalLayout);
