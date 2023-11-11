import React, { useEffect } from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RootState } from 'slices';
import {
  changeLayout,
  changeLayoutMode,
  changeTopbarTheme,
  changeLeftSidebarType,
  changeLeftSidebarTheme,
  changeSidebarImageType,
} from 'slices/layouts/thunk';

import withRouter from '../../Components/Common/withRouter';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

type VerticalLayoutProps = {
  children: React.ReactNode;
};

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
  const dispatch = useAppDispatch();
  const {
    layoutTypes,
    layoutModeTypes,
    topbarThemeTypes,
    leftSidebarTypes,
    leftSideBarThemeTypes,
    leftSidebarImageTypes,
  } = useAppSelector((state: RootState) => ({
    layoutTypes: state.Layout.layoutTypes,
    layoutModeTypes: state.Layout.layoutModeTypes,
    layoutWidthTypes: state.Layout.layoutWidthTypes,
    topbarThemeTypes: state.Layout.topbarThemeTypes,
    leftSidebarTypes: state.Layout.leftSidebarTypes,
    leftSideBarThemeTypes: state.Layout.leftSideBarThemeTypes,
    leftSidebarImageTypes: state.Layout.leftSidebarImageTypes,
  }));

  // const [open, setOpen] = useState<boolean>(false);
  // const toggleCanvas = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {
    if (
      layoutTypes ||
      layoutModeTypes ||
      topbarThemeTypes ||
      leftSidebarTypes ||
      leftSideBarThemeTypes ||
      leftSidebarImageTypes
    ) {
      dispatch(changeLayout(layoutTypes));
      dispatch(changeLayoutMode(layoutModeTypes));
      dispatch(changeTopbarTheme(topbarThemeTypes));
      dispatch(changeLeftSidebarType(leftSidebarTypes));
      dispatch(changeLeftSidebarTheme(leftSideBarThemeTypes));
      dispatch(changeSidebarImageType(leftSidebarImageTypes));
    }
  }, [
    dispatch,
    layoutTypes,
    layoutModeTypes,
    topbarThemeTypes,
    leftSidebarTypes,
    leftSideBarThemeTypes,
    leftSidebarImageTypes,
  ]);

  return (
    <React.Fragment>
      <div id='layout-wrapper'>
        <Header />
        <Sidebar />
        <div className='main-content'>
          {children}
          <Footer />
          {/* <RightSidebar show={open} toggleCanvas={toggleCanvas} /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(VerticalLayout);
