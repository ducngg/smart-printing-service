import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, OffcanvasBody } from 'reactstrap';
import SimpleBar from 'simplebar-react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RootState } from 'slices';
import {
  changeLayoutMode,
  changeLayoutWidth,
  changeTopbarTheme,
  changeLeftSidebarTheme,
  changeSidebarImageType,
  changeLayout,
  changeLeftSidebarType,
} from 'slices/thunk';

import layout1 from '../../assets/images/layouts/layout-1.jpg';
import layout2 from '../../assets/images/layouts/layout-2.jpg';
import layout3 from '../../assets/images/layouts/layout-3.jpg';
import bgimg1 from '../../assets/images/sidebar/img1.jpg';
import bgimg2 from '../../assets/images/sidebar/img2.jpg';
import bgimg3 from '../../assets/images/sidebar/img3.jpg';
import bgimg4 from '../../assets/images/sidebar/img4.jpg';
import {
  LayoutTypes,
  LayoutModeTypes,
  LayoutWidthTypes,
  TopbarThemeTypes,
  LeftSidebarThemeTypes,
  LeftbarThemeImagesTypes,
  LeftSidebarTypes,
} from '../../types/enums/layout';

interface TSideBar {
  show: boolean;
  toggleCanvas: React.EventHandler<SyntheticEvent<Element, Event>>;
}

const RightSidebar = ({ toggleCanvas, show }: TSideBar) => {
  const dispatch = useAppDispatch();
  const {
    layoutType,
    layoutModeType,
    layoutWidthType,
    topbarThemeType,
    leftSidebarThemeType,
    leftSidebarImageType,
    leftSidebarTypes,
  } = useAppSelector((state: RootState) => ({
    layoutType: state.Layout.layoutTypes,
    layoutModeType: state.Layout.layoutModeTypes,
    layoutWidthType: state.Layout.layoutWidthTypes,
    topbarThemeType: state.Layout.topbarThemeTypes,
    leftSidebarThemeType: state.Layout.leftSideBarThemeTypes,
    leftSidebarImageType: state.Layout.leftSidebarImageTypes,
    leftSidebarTypes: state.Layout.leftSidebarTypes,
  }));

  return (
    <React.Fragment>
      <Offcanvas
        isOpen={show}
        toggle={toggleCanvas}
        direction={'end'}
        className='offcanvas-end right-bar border-0'
      >
        <OffcanvasBody className='p-0'>
          <SimpleBar style={{ height: '900px' }}>
            <div data-simplebar className='h-100'>
              <div className='rightbar-title px-3 py-4'>
                <Link className='right-bar-toggle float-end' to='/dashboard' onClick={toggleCanvas}>
                  <i className='mdi mdi-close noti-icon'></i>
                </Link>
                <h5 className='m-0'>Settings</h5>
              </div>
              <hr className='my-0' />
              <div className='p-4'>
                <div className='radio-toolbar'>
                  <span className='mb-2 d-block'>Layouts</span>
                  <input
                    type='radio'
                    id='radioVertical'
                    name='radioVertical'
                    value={LayoutTypes.VERTICAL}
                    checked={layoutType === LayoutTypes.VERTICAL}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayout(e.currentTarget.value as LayoutTypes));
                      }
                    }}
                  />
                  <label className='me-1' htmlFor='radioVertical'>
                    Vertical
                  </label>
                  <input
                    type='radio'
                    id='radioHorizontal'
                    name='radioHorizontal'
                    value={LayoutTypes.HORIZONTAL}
                    checked={layoutType === LayoutTypes.HORIZONTAL}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayout(e.target.value as LayoutTypes));
                      }
                    }}
                  />
                  <label className='me-1' htmlFor='radioHorizontal'>
                    Horizontal
                  </label>
                </div>
                <hr className='mt-1' />
                <div className='radio-toolbar'>
                  <span className='mb-2 d-block'>Layouts Mode</span>
                  <input
                    type='radio'
                    id='radioLight'
                    name='radioLight'
                    value={LayoutModeTypes.LIGHT}
                    checked={layoutModeType === LayoutModeTypes.LIGHT}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayoutMode(e.target.value as LayoutModeTypes));
                      }
                    }}
                  />
                  <label className='me-1' htmlFor='radioLight'>
                    Light
                  </label>
                  <input
                    type='radio'
                    id='radioDark'
                    name='radioDark'
                    value={LayoutModeTypes.DARK}
                    checked={layoutModeType === LayoutModeTypes.DARK}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayoutMode(e.target.value as LayoutModeTypes));
                      }
                    }}
                  />
                  <label htmlFor='radioDark'>Dark</label>
                </div>
                <hr className='mt-1' />
                <div className='radio-toolbar'>
                  <span className='mb-2 d-block' id='radio-title'>
                    Layout Width
                  </span>
                  <input
                    type='radio'
                    id='radioFluid'
                    name='radioWidth'
                    value={LayoutWidthTypes.FLUID}
                    checked={layoutWidthType === LayoutWidthTypes.FLUID}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayoutWidth(e.target.value as LayoutWidthTypes));
                      }
                    }}
                  />

                  <label className='me-1' htmlFor='radioFluid'>
                    Fluid
                  </label>
                  <input
                    type='radio'
                    id='radioBoxed'
                    name='radioWidth'
                    value={LayoutWidthTypes.BOXED}
                    checked={layoutWidthType === LayoutWidthTypes.BOXED}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayoutWidth(e.target.value as LayoutWidthTypes));
                      }
                    }}
                  />
                  <label htmlFor='radioBoxed' className='me-1'>
                    Boxed
                  </label>
                  <input
                    type='radio'
                    id='radioscrollable'
                    name='radioWidth'
                    value={LayoutWidthTypes.SCROLLABLE}
                    checked={layoutWidthType === LayoutWidthTypes.SCROLLABLE}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeLayoutWidth(e.target.value as LayoutWidthTypes));
                      }
                    }}
                  />
                  <label htmlFor='radioscrollable'>Scrollable</label>
                </div>
                <hr className='mt-1' />
                <div className='radio-toolbar'>
                  <span className='mb-2 d-block' id='radio-title'>
                    Topbar Theme
                  </span>
                  <input
                    type='radio'
                    id='radioThemeLight'
                    name='radioTheme'
                    value={TopbarThemeTypes.LIGHT}
                    checked={topbarThemeType === TopbarThemeTypes.LIGHT}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeTopbarTheme(e.target.value as TopbarThemeTypes));
                      }
                    }}
                  />
                  <label className='me-1' htmlFor='radioThemeLight'>
                    Light
                  </label>
                  <input
                    type='radio'
                    id='radioThemeDark'
                    name='radioTheme'
                    value={TopbarThemeTypes.DARK}
                    checked={topbarThemeType === TopbarThemeTypes.DARK}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(changeTopbarTheme(e.target.value as TopbarThemeTypes));
                      }
                    }}
                  />
                  <label className='me-1' htmlFor='radioThemeDark'>
                    Dark
                  </label>
                  {layoutType === 'horizontal' && (
                    <React.Fragment>
                      <input
                        type='radio'
                        id='radioThemeColored'
                        name='radioTheme'
                        value={TopbarThemeTypes.COLORED}
                        checked={topbarThemeType === TopbarThemeTypes.COLORED}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeTopbarTheme(e.target.value as TopbarThemeTypes));
                          }
                        }}
                      />
                      <label className='me-1' htmlFor='radioThemeColored'>
                        Colored
                      </label>{' '}
                    </React.Fragment>
                  )}
                </div>
                <hr className='mt-1' />
                {layoutType === 'vertical' && (
                  <React.Fragment>
                    <div className='radio-toolbar'>
                      <span className='mb-2 d-block' id='radio-title'>
                        Left Sidebar Type{' '}
                      </span>
                      <input
                        type='radio'
                        id='sidebarDefault'
                        name='sidebarType'
                        value={LeftSidebarTypes.DEFAULT}
                        checked={leftSidebarTypes === LeftSidebarTypes.DEFAULT}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLeftSidebarType(e.target.value as LeftSidebarTypes));
                          }
                        }}
                      />
                      <label className='me-1' htmlFor='sidebarDefault'>
                        Default
                      </label>
                      <input
                        type='radio'
                        id='sidebarCompact'
                        name='sidebarType'
                        value={LeftSidebarTypes.COMPACT}
                        checked={leftSidebarTypes === LeftSidebarTypes.COMPACT}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLeftSidebarType(e.target.value as LeftSidebarTypes));
                          }
                        }}
                      />
                      <label className='me-1' htmlFor='sidebarCompact'>
                        Compact
                      </label>
                      <input
                        type='radio'
                        id='sidebarIcon'
                        name='sidebarType'
                        value={LeftSidebarTypes.ICON}
                        checked={leftSidebarTypes === LeftSidebarTypes.ICON}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLeftSidebarType(e.target.value as LeftSidebarTypes));
                          }
                        }}
                      />
                      <label className='me-1' htmlFor='sidebarIcon'>
                        Icon
                      </label>
                    </div>
                    <hr className='mt-1' />
                    <div className='radio-toolbar coloropt-radio'>
                      <span className='mb-2 d-block' id='radio-title'>
                        Left Sidebar Color Options
                      </span>
                      <div className='row'>
                        <div className='col'>
                          <input
                            type='radio'
                            id='leftsidebarThemelight'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.LIGHT}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.LIGHT}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemelight'
                            className='bg-light rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                          <input
                            type='radio'
                            id='leftsidebarThemedark'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.DARK}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.DARK}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemedark'
                            className='bg-dark rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                          <input
                            type='radio'
                            id='leftsidebarThemecolored'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.COLORED}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.COLORED}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemecolored'
                            className='bg-colored rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col'>
                          <input
                            type='radio'
                            id='leftsidebarThemewinter'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.WINTER}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.WINTER}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemewinter'
                            className='gradient-winter rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                          <input
                            type='radio'
                            id='leftsidebarThemeladylip'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.LADYLIP}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.LADYLIP}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemeladylip'
                            className='gradient-lady-lip rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                          <input
                            type='radio'
                            id='leftsidebarThemeplumplate'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.PLUMPLATE}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.PLUMPLATE}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemeplumplate'
                            className='gradient-plum-plate rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                          <input
                            type='radio'
                            id='leftsidebarThemestrongbliss'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.STRONGBLISS}
                            checked={false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemestrongbliss'
                            className='gradient-strong-bliss rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                          <input
                            type='radio'
                            id='leftsidebarThemesgreatwhale'
                            name='leftsidebarTheme'
                            value={LeftSidebarThemeTypes.GREATWHALE}
                            checked={leftSidebarThemeType === LeftSidebarThemeTypes.GREATWHALE}
                            onChange={(e) => {
                              if (e.target.checked) {
                                dispatch(
                                  changeLeftSidebarTheme(e.target.value as LeftSidebarThemeTypes)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor='leftsidebarThemesgreatwhale'
                            className='gradient-strong-great-whale rounded-circle wh-30 me-1'
                          >
                            {}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='radio-toolbar imgopt-radio'>
                      <span className='mb-2 d-block' id='radio-bgimg'>
                        Left Sidebar Bg Image
                      </span>
                      <div className='d-flex gap-2 flex-wrap'>
                        <input
                          type='radio'
                          id='leftsidebarThemebgimg1'
                          name='leftsidebarThemeImage'
                          value={LeftbarThemeImagesTypes.IMG1}
                          checked={leftSidebarImageType === LeftbarThemeImagesTypes.IMG1}
                          onChange={(e) => {
                            if (e.target.checked) {
                              dispatch(
                                changeSidebarImageType(e.target.value as LeftbarThemeImagesTypes)
                              );
                            }
                          }}
                        />
                        <label htmlFor='leftsidebarThemebgimg1'>
                          <img
                            alt='sidebar bg img'
                            width='90'
                            className='themesideimage rounded'
                            src={bgimg1}
                          />
                        </label>
                        <input
                          type='radio'
                          id='leftsidebarThemebgimg2'
                          name='leftsidebarThemeImage'
                          value={LeftbarThemeImagesTypes.IMG2}
                          checked={leftSidebarImageType === LeftbarThemeImagesTypes.IMG2}
                          onChange={(e) => {
                            if (e.target.checked) {
                              dispatch(
                                changeSidebarImageType(e.target.value as LeftbarThemeImagesTypes)
                              );
                            }
                          }}
                        />
                        <label htmlFor='leftsidebarThemebgimg2'>
                          <img
                            alt='sidebar bg img'
                            width='90'
                            className='themesideimage rounded'
                            src={bgimg2}
                          />
                        </label>
                        <input
                          type='radio'
                          id='leftsidebarThemebgimg3'
                          name='leftsidebarThemeImage'
                          value={LeftbarThemeImagesTypes.IMG3}
                          checked={leftSidebarImageType === LeftbarThemeImagesTypes.IMG3}
                          onChange={(e) => {
                            if (e.target.checked) {
                              dispatch(
                                changeSidebarImageType(e.target.value as LeftbarThemeImagesTypes)
                              );
                            }
                          }}
                        />
                        <label htmlFor='leftsidebarThemebgimg3'>
                          <img
                            alt='sidebar bg img'
                            width='90'
                            className='themesideimage rounded'
                            src={bgimg3}
                          />
                        </label>
                        <input
                          type='radio'
                          id='leftsidebarThemebgimg4'
                          name='leftsidebarThemeImage'
                          value={LeftbarThemeImagesTypes.IMG4}
                          checked={leftSidebarImageType === LeftbarThemeImagesTypes.IMG4}
                          onChange={(e) => {
                            if (e.target.checked) {
                              dispatch(
                                changeSidebarImageType(e.target.value as LeftbarThemeImagesTypes)
                              );
                            }
                          }}
                        />
                        <label htmlFor='leftsidebarThemebgimg4'>
                          <img
                            alt='sidebar bg img'
                            width='90'
                            className='themesideimage rounded'
                            src={bgimg4}
                          />
                        </label>
                        <input
                          type='radio'
                          id='leftsidebarThemenone'
                          name='leftsidebarThemeImage'
                          value={LeftbarThemeImagesTypes.NONE}
                          checked={leftSidebarImageType === LeftbarThemeImagesTypes.NONE}
                          onChange={(e) => {
                            if (e.target.checked) {
                              dispatch(
                                changeSidebarImageType(e.target.value as LeftbarThemeImagesTypes)
                              );
                            }
                          }}
                        />
                        <label htmlFor='leftsidebarThemenone'>
                          <div style={{ width: '40px', height: '80px' }}>
                            <div className='bg-light border px-2 h-100 shadow-none'>
                              <div className='verticalcontent'>None</div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                <hr className='mt-1' />
                <div className='mb-3'>
                  <span className='mb-2 d-block' id='radio-title'>
                    Preloader
                  </span>
                  <div className='form-check form-switch'>
                    <input type='checkbox' className='form-check-input checkbox' id='checkbox_1' />
                    <label className='form-check-label' htmlFor='checkbox_1'>
                      Preloader
                    </label>
                  </div>
                </div>
                <h6 className='text-center'>Choose Layouts</h6>
                <div className='mb-2'>
                  <a href='//skote-v-light.react.themesbrand.com'>
                    <img src={layout1} className='img-fluid img-thumbnail' alt='' />
                  </a>
                </div>
                <div className='mb-2'>
                  <a href='//skote-v-dark.react.themesbrand.com'>
                    <img src={layout2} className='img-fluid img-thumbnail' alt='' />
                  </a>
                </div>
                <div className='mb-2'>
                  <a href='//skote-v-rtl.react.themesbrand.com'>
                    <img src={layout3} className='img-fluid img-thumbnail' alt='' />
                  </a>
                </div>
                <a className='btn btn-primary btn-block mt-3' href='//1.envato.market/skotereact'>
                  <i className='mdi mdi-cart ms-1'></i> Purchase Now
                </a>
              </div>
            </div>
          </SimpleBar>

          <div className='rightbar-overlay'></div>
        </OffcanvasBody>
      </Offcanvas>
    </React.Fragment>
  );
};

export default RightSidebar;
